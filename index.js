// Define a function to flatten a complex object
function flattenObject(flattenedObject, complexObject, parentObjectName = "") {
	for (const property in complexObject) {
		// Create a prefix for the current property name based on its parent object name
		let currentObjectName = parentObjectName
			? `${parentObjectName}_${property}`
			: property;

		// Check if the current property is an object (but not an array or null)
		if (Array.isArray(complexObject[property])) {
			console.log(currentObjectName);
			for (let i = 0; i < complexObject[property].length; i++) {
				if (
					typeof complexObject[property][i] === "object" &&
					complexObject[property] !== null
				) {
					console.log("Element");
					console.log(complexObject[property][i]);
					flattenObject(
						flattenedObject,
						complexObject[property][i],
						currentObjectName + "_" + i
					);
				} else {
					flattenedObject[currentObjectName] = complexObject[property][i];
				}
			}
		} else if (
			typeof complexObject[property] === "object" &&
			complexObject[property] !== null
		) {
			// Recursively call the flattenObject function with the current property as the new complex object and the current prefix as the new parent object name
			flattenObject(
				flattenedObject,
				complexObject[property],
				currentObjectName
			);
		} else {
			// Otherwise, add the current property to the flattened object with the current prefix as the key
			flattenedObject[currentObjectName] = complexObject[property];
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
