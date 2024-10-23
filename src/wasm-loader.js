// 动态查找和加载 WASM 模块
export async function loadWasm(moduleName) {
  try {
    // 尝试动态导入模块
    const module = await import(/* @vite-ignore */ moduleName);
    
    // 如果模块有默认导出并且是一个函数，则调用它
    if (typeof module.default === 'function') {
      await module.default();
    }
    
    return module;
  } catch (error) {
    console.error(`Failed to load WASM module: ${moduleName}`, error);
    throw error;
  }
}

// 示例：加载特定的 WASM 模块
export async function loadSecp256k1() {
  return loadWasm('tiny-secp256k1/lib/secp256k1.wasm');
}
