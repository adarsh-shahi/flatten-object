### flattenObject function

The flattenObject function is a recursive function that takes a complex JavaScript object and returns a flattened version of it, where each property is represented by a flattened path name. For example, given the following complex object:

```javascript
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
```

The flattened version of it would be:

```javascript
{
  id: 1,
  name: 'John Doe',
  contact_email: 'johndoe@example.com',
  contact_phone_home: '123-456-7890',
  contact_phone_work: '098-765-4321',
  contact_phone_getHomeAreaCode: [Function: getHomeAreaCode],
  contact_phone_getWorkAreaCode: [Function: getWorkAreaCode],
  address_street: '123 Main St',
  address_city: 'Anytown',
  address_state: 'CA',
  address_zip: '12345',
  address_country: 'USA',
  address_coordinates_latitude: 37.7749,
  address_coordinates_longitude: -122.4194,
  orders_0_id: 100,
  orders_0_date: '2022-01-01',
  orders_0_items_0_id: 1,
  orders_0_items_0_name: 'Product A',
  orders_0_items_0_price: 10.99,
  orders_0_items_1_id: 2,
  orders_0_items_1_name: 'Product B',
  orders_0_items_1_price: 19.99,
  orders_0_getTotal: [Function: getTotal],
  orders_1_id: 101,
  orders_1_date: '2022-01-05',
  orders_1_items_0_id: 3,
  orders_1_items_0_name: 'Product C',
  orders_1_items_0_price: 14.99,
  orders_1_getTotal: [Function: getTotal]
}

```
