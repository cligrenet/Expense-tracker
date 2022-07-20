export const options = [
	{ value: 'Bills', label: 'Bills' },
	{ value: 'Business', label: 'Business' },
	{ value: 'Bank_Fees', label: 'Bank Fees' },
	{ value: 'Car', label: 'Car' },
	{ value: 'Education_Training', label: 'Education/Training' },
	{ value: 'Entertainment', label: 'Entertainment' },
	{ value: 'Food_Grocery', label: 'Food/Grocery' },
	{ value: 'Gifts', label: 'Gifts' },
	{ value: 'House', label: 'House' },
	{ value: 'Investments', label: 'Investments' },
	{ value: 'Interest', label: 'Interest' },
	{ value: 'Insurance', label: 'Insurance' },
	{ value: 'Kid', label: 'Kid' },
	{ value: 'Legal_Fees', label: 'Legal Fees' },
	{ value: 'Medical', label: 'Medical' },
	{ value: 'Online_Services', label: 'Online Services' },
	{ value: 'Other', label: 'Other' },
	{ value: 'Pet', label: 'Pet' },
	{ value: 'Phone_Internet', label: 'Phone/Internet' },
	{ value: 'Post_Shipping', label: 'Post/Shipping' },
	{ value: 'Rental', label: 'Rental' },
	{ value: 'Repairs_Maintenance', label: 'Repairs/Maintenance' },
	{ value: 'Restaurant', label: 'Restaurant' },
	{ value: 'Salary', label: 'Salary' },
	{ value: 'Saving', label: 'Saving' },
	{ value: 'Software', label: 'Software' },
	{ value: 'Shopping', label: 'Shopping' },
	{ value: 'Subscriptions_Memberships', label: 'Subscriptions/Memberships' },
	{ value: 'Taxes', label: 'Taxes' },
	{ value: 'Transport', label: 'Transport' },
	{ value: 'Travel', label: 'Travel' },
];

export const categories = options.map((category) => category.value);

const incomeColors = [
	'#123123',
	'#154731',
	'#165f40',
	'#16784f',
	'#14915f',
	'#10ac6e',
	'#0bc77e',
	'#04e38d',
	'#00ff9d',
];

const expenseColors = [
	'#ffe6e6',
	'#ffcccc',
	'#ffb3b3',
	'#ff9999',
	'#ff8080',
	'#ff6666',
	'#ff4d4d',
	'#ff3333',
	'#ff1a1a',
	'#ff0000',
	'#e60000',
	'#cc0000',
	'#b30000',
	'#990000',
	'#800000',
	'#330000',
	'#e62e00',
	'#b50d12',
	'#bf2f1f',
	'#c9452c',
	'#d3583a',
	'#dc6a48',
	'#e57c58',
	'#ee8d68',
	'#f79d79',
	'#ff2e62',
	'#cc474b',
	'#f55b5f',
];

export const incomeCategories = [
	{ type: 'Business', amount: 0, color: incomeColors[0] },
	{ type: 'Gifts', amount: 0, color: incomeColors[1] },
	{ type: 'Investments', amount: 0, color: incomeColors[2] },
	{ type: 'Interest', amount: 0, color: incomeColors[3] },
	{ type: 'Insurance', amount: 0, color: incomeColors[4] },
	{ type: 'Other', amount: 0, color: incomeColors[5] },
	{ type: 'Rental', amount: 0, color: incomeColors[6] },
	{ type: 'Salary', amount: 0, color: incomeColors[7] },
	{ type: 'Saving', amount: 0, color: incomeColors[8] },
];

export const expenseCategories = [
	{ type: 'Bills', amount: 0, color: expenseColors[0] },
	{ type: 'Business', amount: 0, color: expenseColors[1] },
	{ type: 'Bank_Fees', amount: 0, color: expenseColors[2] },
	{ type: 'Car', amount: 0, color: expenseColors[3] },
	{ type: 'Education_Training', amount: 0, color: expenseColors[4] },
	{ type: 'Entertainment', amount: 0, color: expenseColors[5] },
	{ type: 'Food_Grocery', amount: 0, color: expenseColors[6] },
	{ type: 'Gifts', amount: 0, color: expenseColors[7] },
	{ type: 'House', amount: 0, color: expenseColors[8] },
	{ type: 'Investments', amount: 0, color: expenseColors[9] },
	{ type: 'Insurance', amount: 0, color: expenseColors[10] },
	{ type: 'Kid', amount: 0, color: expenseColors[11] },
	{ type: 'Legal_Fees', amount: 0, color: expenseColors[12] },
	{ type: 'Medical', amount: 0, color: expenseColors[13] },
	{ type: 'Online_Services', amount: 0, color: expenseColors[14] },
	{ type: 'Other', amount: 0, color: expenseColors[15] },
	{ type: 'Pet', amount: 0, color: expenseColors[16] },
	{ type: 'Phone_Internet', amount: 0, color: expenseColors[17] },
	{ type: 'Post_Shipping', amount: 0, color: expenseColors[18] },
	{ type: 'Rental', amount: 0, color: expenseColors[19] },
	{ type: 'Repairs_Maintenance', amount: 0, color: expenseColors[20] },
	{ type: 'Restaurant', amount: 0, color: expenseColors[21] },
	{ type: 'Software', amount: 0, color: expenseColors[22] },
	{ type: 'Shopping', amount: 0, color: expenseColors[23] },
	{ type: 'Subscriptions_Memberships', amount: 0, color: expenseColors[24] },
	{ type: 'Taxes', amount: 0, color: expenseColors[25] },
	{ type: 'Transport', amount: 0, color: expenseColors[26] },
	{ type: 'Travel', amount: 0, color: expenseColors[27] },
];

export const resetCategories = () => {
	incomeCategories.forEach((c) => (c.amount = 0));
	expenseCategories.forEach((c) => (c.amount = 0));
};
