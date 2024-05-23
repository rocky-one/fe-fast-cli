import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
	input: './src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    json(),
  ]
};