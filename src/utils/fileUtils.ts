// src/utils/fileUtils.ts
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = new Uint8Array(buffer);
    const chunks: string[] = [];
    const chunkSize = 8192;
  
    for (let i = 0; i < binary.length; i += chunkSize) {
      chunks.push(String.fromCharCode(...binary.subarray(i, i + chunkSize)));
    }
  
    return btoa(chunks.join(''));
  };
  
  export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsArrayBuffer(file);
    });
  };