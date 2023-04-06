function flattenObject(flattenedObject, complexObject, parentObjectName = "") {
	for (const property in complexObject) {
		// Create a prefix for the current property name based on its parent object name
		const currentObjectName = parentObjectName
			? `${parentObjectName}_${property}`
			: property;

		const propertyValue = complexObject[property];

		if (Array.isArray(propertyValue)) {
			// If the current property is an array, loop through each element and recursively call the flattenObject function with the current element as the new complex object and a new prefix including the element index
			for (let i = 0; i < propertyValue.length; i++) {
				const currentElementName = `${currentObjectName}_${i}`;

				if (typeof propertyValue[i] === "object" && propertyValue[i] !== null) {
					flattenObject(flattenedObject, propertyValue[i], currentElementName);
				} else {
					flattenedObject[currentElementName] = propertyValue[i];
				}
			}
		} else if (typeof propertyValue === "object" && propertyValue !== null) {
			// If the current property is an object (but not an array or null), recursively call the flattenObject function with the current property as the new complex object and the current prefix as the new parent object name
			flattenObject(flattenedObject, propertyValue, currentObjectName);
		} else {
			// Otherwise, add the current property to the flattened object with the current prefix as the key
			flattenedObject[currentObjectName] = propertyValue;
		}
	}
}

export default function flatObject(complexObject) {
	// Define an empty object to store the flattened object
	const flattenedObject = {};
	// Call the flattenObject function with the complex object and the empty object as arguments
	flattenObject(flattenedObject, complexObject);
	return flattenedObject;
}
