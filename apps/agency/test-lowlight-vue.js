import { common, createLowlight } from 'lowlight';
const lowlight = createLowlight(common);
try {
  let res = lowlight.highlight('vue', '<template></template>');
  console.log("Success with vue");
} catch(e) {
  console.error("Error for vue:", e.message);
}
