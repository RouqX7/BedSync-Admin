// Import the mapWardIdToName function from the firebase file
import { mapWardIdToName } from "../firebase";
// Call the function with a specific ward ID
const testMapWardIdToName = async () => {
  const wardId = '6Q02RyNwC0fQdaBvHtD9'; // Replace 'your-ward-id-here' with an actual ward ID
  const wardName = await mapWardIdToName(wardId);
  console.log('Ward Name:', wardName);
};

// Call the function to test
testMapWardIdToName();
