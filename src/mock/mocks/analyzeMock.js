const API = require("../../apis");

const analyzeVO = {
    data: [
						{
						orderId: 161231234,
						orderDeadline: "2002-08-22",
						planDeadline: "1977-11-29",
						requireHuman: 4,
						requireDevice: 1,
						requireLine: 1,
						avgProgress: 0.33,
						delays: [
							{
							  date: "1979-05-23",
							  progress: "0.25",
							  human: {
								enough: false,
								resources: [
								  {
									resourceName: "马保国",
									maxWorkTime: "12",
									actualWorkTime: "8",
									occupations: [
									  
									  {
									  										orderId: 463467,
									  										time: 2
									  },
									  {
									  										orderId: 3467457,
									  										time: 2
									  }
									]
								  }
								]
							  },
							  device: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "设备1",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  },
							  line: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "产线2",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  }
							}
						],
						},
						{
						orderId: 261231234,
						orderDeadline: "2002-08-22",
						planDeadline: "1977-11-29",
						requireHuman: 4,
						requireDevice: 1,
						requireLine: 1,
						avgProgress: 0.33,
						delays: [
							{
							  date: "1979-05-23",
							  progress: "0.25",
							  human: {
								enough: false,
								resources: [
								  {
									resourceName: "马保国",
									maxWorkTime: "12",
									actualWorkTime: "8",
									occupations: [
									  {
										orderId: 8,
										time: 2
									  }
									]
								  }
								]
							  },
							  device: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "马保国",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  },
							  line: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "马保国",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  }
							}
						],
						},
						],
    code: 200,
    msg: "ok"
};

module.exports = {
    getdelayList: [API.DELAYLIST, "get", analyzeVO],
};
