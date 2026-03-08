import { common, createLowlight } from 'lowlight';
const lowlight = createLowlight(common);
try {
  let res = lowlight.highlight('plaintext', 'const x = 1;');
  console.log("Success with plaintext", JSON.stringify(res, null, 2));
} catch(e) {
  console.error("Error for plaintext:", e.message);
}

try {
  let res = lowlight.highlightAuto('const x = 1;');
  console.log("Success with auto", JSON.stringify(res, null, 2));
} catch(e) {
  console.error("Error auto:", e.message);
}

