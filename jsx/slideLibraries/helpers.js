// helper functions
module.exports = {
	advanceNDays: function (gameState, numDays) {
		gameState.daysToArrival -= numDays;
		gameState.food -= (gameState.partySize  * numDays); //how many units of food does one person eat in a day? using 1 for now
		gameState.fuel -= numDays;
		gameState.oxygen -= (gameState.partySize * numDays); //again, maybe people use more than one unit of oxygen in a day, just using 1 for now
		
		return gameState;
	}, 

	
	getRandomShipName: function () {
	//list of the ships in Game of Thrones
	var boatNames = [ 
	'Black Wind',
	'Dagger',
	'Esgred',
	'Forlorn Hope',
	'Golden Storm',
	'Great Kraken',
	'Grey Ghost',
	'Grief',
	'Hardhand',
	'Iron Lady',
	'Iron Vengeance',
	'Iron Victory',
	'Iron Wind',
	'Iron Wing',
	'Kite',
	'Kraken\'s Kiss',
	'Lamentation',
	'Leviathan',
	'Maiden\'s Bane',
	'Nightflyer',
	'Reapers Wind',
	'Red Jester',
	'Red Tide',
	'Salty Wench',
	'Sea Bitch',
	'Sea Song',
	'Seven Skulls',
	'Shark',
	'Silence',
	'Silverfin',
	'Sparrowhawk',
	'Thunderer',
	'Warhammer',
	'Warrior Wench',
	'White Widow',
	'Woe'
	]

	var randIndex = this.getRandomInt(0, boatNames.length - 1);
	return boatNames[randIndex];  
},

// returns a number from min and max, inclusive
getRandomInt: function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
},

recommendResources: function (gameState) {
	var recommendations = {};

	recommendations.food = (gameState.partySize) * gameState.daysToArrival;
	recommendations.oxygen = (gameState.partySize) * gameState.daysToArrival;
	recommendations.fuel = (gameState.partySize) * gameState.daysToArrival;

	return recommendations;
},

getRandomPlayerName: function () {
	var playerNames = [
	'Angelique',
	'Antony',
	'Bradley',
	'Brant',
	'Brian',
	'Carin',
	'Corinna',
	'Darby',
	'Daryl',
	'Deana',
	'Dione',
	'Jeanna',
	'Jody',
	'Judd',
	'Kandi',
	'Lance',
	'Lea',
	'Linette',
	'Marc',
	'Raquel',
	'Reginal',
	'Shellie',
	'Shiela',
	'Shonna',
	'Tanja',
	'Tracy',
	'Tyrone',
	'Valencia',
	'Wendy',
	'Zandra', 
	'Yessenia', 
	'Mara',
	'Hector', 
	'Anthea',
	'Jerry ',
	'Allen',
	'Allan',
	'Wendell',
	'Kennith',
	'Connie',
	'Gaylon',
	'Jame',
	'Windell',
	'Harrell',
	'Tex',
	'Gloria',
	'Janice',
	'Jerrel',
	'Wilkie',
	'Wendel',
	'Judith',
	'Priscilla', 
	'Pat', 
	'Sondra', 
	'Jerry', 
	'Earnestine', 
	'Larry', 
	'Merlene', 
	'Lonna'
	]

	var randIndex = this.getRandomInt(0, playerNames.length - 1);
	return playerNames[randIndex];  
},

purchaseSupplies: function (item, quantity, gameState) {
	var quantity = parseInt(quantity);
	var cost = gameState.currentSupplyPrices[item] * quantity;

	if (gameState.money >= cost) {
		gameState.money -= cost;	
		if (gameState[item]) {
			gameState[item] += quantity;
		} else {
			gameState[item] = quantity;
		}
	}

	return gameState;
}
}
