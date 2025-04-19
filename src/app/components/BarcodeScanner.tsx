'use client';

import { useRef, useState, useEffect } from 'react';
import { BarcodeDetector } from 'barcode-detection';

// Check if BarcodeDetector is supported in the browser
const isBarcodeDetectorSupported = typeof window !== 'undefined' && 'BarcodeDetector' in window;

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
}

export default function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detector, setDetector] = useState<BarcodeDetector | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  // Set up barcode detector if supported
  useEffect(() => {
    if (!isBarcodeDetectorSupported) {
      setError('Barcode detection is not supported in this browser');
      return;
    }

    try {
      const barcodeDetector = new BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_39', 'code_128'],
      });
      setDetector(barcodeDetector);
    } catch (err) {
      setError('Error initializing barcode detector');
      console.error(err);
    }
  }, []);

  // Get available cameras
  useEffect(() => {
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        
        if (videoDevices.length > 0) {
          // Default to the environment-facing camera if available
          const envCamera = videoDevices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('environment')
          );
          setSelectedDeviceId(envCamera?.deviceId || videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setError('Unable to access camera. Please check permissions.');
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      getDevices();
    } else {
      setError('Media devices not supported in this browser');
    }
  }, []);

  // Start video stream when scanning begins
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startVideo() {
      if (!videoRef.current || !selectedDeviceId) return;
      
      try {
        const constraints = {
          video: { 
            deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error('Error accessing the camera:', err);
        setError('Unable to access camera. Please check permissions.');
        setIsScanning(false);
      }
    }

    if (isScanning) {
      startVideo();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning, selectedDeviceId]);

  // Set up barcode detection loop
  useEffect(() => {
    if (!isScanning || !detector || !videoRef.current) return;
    
    let animationFrameId: number;
    let lastDetectionTime = 0;
    const detectionInterval = 200; // ms between scans
    
    const detectBarcode = async (time: number) => {
      if (!videoRef.current || !detector) return;
      
      if (time - lastDetectionTime > detectionInterval) {
        lastDetectionTime = time;
        
        try {
          const barcodes = await detector.detect(videoRef.current);
          
          if (barcodes.length > 0) {
            // Use the first barcode detected
            onDetected(barcodes[0].rawValue);
            setIsScanning(false);
            return;
          }
        } catch (err) {
          console.error('Barcode detection error:', err);
        }
      }
      
      animationFrameId = requestAnimationFrame(detectBarcode);
    };
    
    animationFrameId = requestAnimationFrame(detectBarcode);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [detector, isScanning, onDetected]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
    if (isScanning) {
      // Restart the stream with the new device
      setIsScanning(false);
      setTimeout(() => setIsScanning(true), 100);
    }
  };

  const toggleScanner = () => {
    setIsScanning(prev => !prev);
  };

  if (!isBarcodeDetectorSupported) {
    return (
      <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
        <p>
          Your browser doesn't support the Barcode Detection API. Try using Chrome 83+ or Edge 83+.
        </p>
        <p className="mt-2">
          You can still enter product barcodes manually.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}
      
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={toggleScanner}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            isScanning
              ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600'
              : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
          }`}
        >
          {isScanning ? 'Stop Scanner' : 'Start Scanner'}
        </button>

        {devices.length > 1 && (
          <select
            value={selectedDeviceId}
            onChange={handleDeviceChange}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {devices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${devices.indexOf(device) + 1}`}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={`relative overflow-hidden rounded-lg border-2 ${isScanning ? 'border-green-500' : 'border-gray-300'} ${isScanning ? 'block' : 'hidden'}`}>
        <video
          ref={videoRef}
          className="h-[300px] w-full object-cover"
          autoPlay
          playsInline
          muted
        />
        
        {isScanning && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-lg border-2 border-dashed border-green-500 bg-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded bg-black/70 px-2 py-1 text-sm text-white">
                Position barcode in the center
              </p>
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Point your camera at a product barcode to scan automatically
      </p>
    </div>
  );
}