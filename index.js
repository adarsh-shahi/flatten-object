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

// Define a complex object to be flattened
const complexObject = {
	id: 1,
	name: "John Doe",
	contact: {
		email: "johndoe@example.com",
		phone: {
			home: "123-456-7890",
			work: "098-765-4321",
			getHomeAreaCode: function () {
				return this.home.slice(0, 3);
			},
			getWorkAreaCode: function () {
				return this.work.slice(0, 3);
			},
		},
	},
	address: {
		street: "123 Main St",
		city: "Anytown",
		state: "CA",
		zip: "12345",
		country: "USA",
		coordinates: {
			latitude: 37.7749,
			longitude: -122.4194,
		},
	},
	orders: [
		{
			id: 100,
			date: "2022-01-01",
			items: [
				{
					id: 1,
					name: "Product A",
					price: 10.99,
				},
				{
					id: 2,
					name: "Product B",
					price: 19.99,
				},
			],
			getTotal: function () {
				let total = 0;
				this.items.forEach((item) => {
					total += item.price;
				});
				return total;
			},
		},
		{
			id: 101,
			date: "2022-01-05",
			items: [
				{
					id: 3,
					name: "Product C",
					price: 14.99,
				},
			],
			getTotal: function () {
				let total = 0;
				this.items.forEach((item) => {
					total += item.price;
				});
				return total;
			},
		},
	],
};

// Define an empty object to store the flattened object
const flattenedObject = {};

// Call the flattenObject function with the complex object and the empty object as arguments
flattenObject(flattenedObject, complexObject);
console.log(flattenedObject);
