// src/workers/calc.worker.ts
/// <reference lib="webworker" />

self.onmessage = (event: MessageEvent<ImageData>) => {
  const imagedata = event.data;
  const data = imagedata.data;
  console.log("window type: ", typeof window);
  for (let i = 0; i < data.length; i += 4) {
    if ((i / 4) % imagedata.width === imagedata.width - 1) {
      // 一行中的最后一列
      for (let j = 0; j < 4; j++) {
        data[i + j] = data[i + j - 4];
      }
    } else {
      for (let j = 0; j < 4; j++) {
        data[i + j] = 2 * data[i + j] - data[i + j + 4] * 1.5;
      }
    }
  }
  postMessage(imagedata);
};
