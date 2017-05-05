// var newdata;


$.ajax('data/xxx.json', {
	type: 'GET',
	cache: false,
	success: function(data) {
		// console.log(data);

		newdata = typeof data === 'string' ? JSON.parse(data) : data;

		startVuestaff(newdata);
	},
	error: function(xhr, ajaxOptions, thrownError) {
		console.log('error');
	}
});



function startVuestaff(newdata) {
	// console.log(newdata.companies);


	Vue.component('brand', {
		props: ['name'],
		template: '<button type="button">{{ name }} brand</button>'
	});

	Vue.component('company', {
		props: ['name'],
		template: '<button type="button">{{ name }} company</button>'
	});



	var
		docTypeDivs = document.getElementsByClassName('doc-type'),
		tempData = {},

		defineCompanyBrands = function(companies, id) {

			if (id != -1) {
				// console.log(companies);
				for (var i = 0; i < companies.length; i++) {
					if (companies[i].id == id) {
						var companyBrandsIds = companies[i].brands;
						break;
					}
				}

				var companyBrands = [];

				for (var j = 0; j < companyBrandsIds.length; j++) {
					for (var i = 0; i < newdata.data.brands.length; i++) {
						if (newdata.data.brands[i].id == companyBrandsIds[j]) {
							companyBrands.push(newdata.data.brands[i]);
							break;
						}
					}
				}

				// currentState.currentBrandId = companyBrandsIds[0];
				// brands.brands = companyBrands;



				return companyBrands;

			} else {
				var
					brandsIdsArr = [],
					 brandsArr = [];


				_.forEach(newdata.data.companies,  function(value, i)  {  
					brandsIdsArr.push(...value.brands);
				});


				_.forEach(brandsIdsArr,  function(value, i)  {
					_.forEach(newdata.data.brands,  function(brandObj, i)  {
						if (brandObj.id == value) { 
							brandsArr.push(brandObj);
							return false;
						}
					});
				});

				 
				return  _.uniqBy(brandsArr, 'id');

			}

		},



		defineContent = function(IdArr) {
			var contentArr = [];

			_.forEach(IdArr,  function(id, i)  {

			});

			return contentArr;
		}


	currentState = new Vue({
			el: "#current-states",
			data: {
				currentCompanyId: 0,
				// currentCompanyPos: 0,
				currentBrandId: 0
					// currentBrandPos: 0,
					// currentDocType: 'docs'
			}
		}),

		companies = new Vue({
			el: "#companies",
			data: {
				companies: newdata.data.companies
			},
			// computed: {
			// 	brands: function() {
			// 		return defineCompanyBrands(this.companies);
			// 	}
			// },

			methods: {
				companyClick: function(e, index, companyId) {

					currentState.currentCompanyId = companyId;
					// currentState.currentCompanyPos = index;

					// brands.brands = defineCompanyBrands(currentState.currentCompanyId);
					// console.log(brands.brands);


					currentState.currentBrandId = brands.brands[0].id;
					// currentState.currentBrandPos = 0;

					actualDocs.docsData = brands.brands[0].content;


					// updateDocs();
				}
			}
		}),
		/**/

		brands = new Vue({
			el: "#brands",
			data: {
				allmanagers: newdata.data.managers,
				showselect: false
			},
			computed: {
				brands: function() {
					// return _.uniqBy(companies.brands, 'id');
					var brandsOfCurrentCompany = _.uniqBy(defineCompanyBrands(companies.companies, currentState.currentCompanyId), 'id');
					// console.log(brandsOfCurrentCompany);
					return brandsOfCurrentCompany;
				},
				managers: function() {
					// console.log(companies.brands);
					// console.log('this.brands', this.brands);
					return this.brands;
				},
				realmanagers: function() {
					var companyBrandasManagers = [];
					_.forEach(this.brands,  function(brand, i)  {
						// console.log(brand);
						var managers = [];
						_.forEach(brand.managers,  function(id, i)  {
							// console.log(id);
							_.forEach(newdata.data.managers,  function(obj, i)  {
								if (obj.id == id) {
									managers.push(obj.name);
									return false;
								}

							});
						});
						companyBrandasManagers.push(managers);
					});
					return (companyBrandasManagers);
				},
			},
			methods: {
				brandClick: function(e, index, brandid) {
					// console.log(e, index, brandid);
					currentState.currentBrandId = brandid;

					_.forEach(newdata.data.brands,  function(value, i)  {
						// console.log(value, brandid);  
						if (value.id == brandid) {
							actualDocs.docsData = value.content;
						}
					});


					// updateDocs();
				},
				managersclick: function(e, brandid) {
					this.showselect = true;
					// console.log(this.showselect);
				},
				// defineManagers = function (IdArr) {
				// 	var managersArr = [];

				// 	_.forEach(IdArr,  function(id, i)  {

				// 	});
				// 	console.log(brands.managers);

				// 	return managersArr;
				// },	
			}
		}),

		/**/
		actualDocs = new Vue({
			el: "#actual-docs",
			data: {
				docsData: brands.brands[0].content,
				currentDocType: 'docs',
				docsdata: newdata.data.content,
				min: null,
				max: null,
				modifier: false
					// capsule: null,
					// docsTemplate: "0"
			},
			computed: {
				docsCurrentType: function() {
					// console.log(this.docsData[this.currentDocType]);
					return this.docsData[this.currentDocType];
				},
				allCurrentContent: function() { // весь контент для текущей компании и текущего бренда текущего типа документов
					_this = this;
					// console.log(newdata.data.content[_this.currentDocType]);
					// console.log(_this.docsData[_this.currentDocType]);
					var arr = [];
					_.forEach(newdata.data.content[_this.currentDocType],  function(doc, i)  {
						_.forEach(_this.docsCurrentType,  function(id, i)  {
							// console.log(doc, id);
							if (doc.id == id) {
								arr.push(doc);
							}
						});
					});
					this.modifier = false;
					return arr;
				}
			},
			methods: {
				commentFun: function(e, index, nine, onetd) {
					// console.log(e.target.dataset, e, index, nine, onetd);
					if (index == 3) {
						console.log('index == 3');
					}

					if (index == 0) {
						console.log('index == 0');
					}

					if (index == 8) {
						console.log('index == 8');
					}
				},
				tablesort: function(argument) {
					// this.modifier = !this.modifier;

					if (this.modifier) {
						// return x - y;
						// arr.reverse();
						var arr = [];
						_.forEach(this.allCurrentContent,  function(doc, i)  {
							_.forEach(doc.data,  function(block, i)  {
								block.reverse();
							});
						});
					} else {

						var arr = [];
						_.forEach(this.allCurrentContent,  function(doc, i)  {
							_.forEach(doc.data,  function(block, i)  {
								block.sort(function(a, b) { //сортируем строки внутри блока
									var
										x = a[2].substring(3, 7) + a[2].substring(0, 2),
										y = b[2].substring(3, 7) + b[2].substring(0, 2);
									// console.log(x, y);
									return x - y;
								});
							});
						});

						this.modifier = true;
					}


				},
				tablefilter: function() {
					console.log(this.min, this.max);
				}
			}
			// watch: {
			//   docsdata: function (content) {
			//   		this.result(content)
			// 	}
			// }
		})

	for (var i = 0; i < docTypeDivs.length; i++) {
		docTypeDivs[i].onclick = function(e) {
			actualDocs.currentDocType = e.target.dataset.docType;
			// actualDocs.docsData =
			// console.log(actualDocs.currentDocType, newdata.companies, currentState.currentCompany, currentState.currentBrand );
			// actualDocs.docsTemplate = e.target.dataset.docType;

			// updateDocs();
		};
	}



	document.getElementById("all-companies").onclick = allCompaniesClick;

	document.getElementById("all-brands").onclick = allbrandsClick;

	document.getElementById("availablemanager").onchange = availableManagersClick;



	function allCompaniesClick(e) {
		currentState.currentCompanyId = -1;



		// 	updateDocs();

	}

	function allbrandsClick(e) {
		currentState.currentBrandId = -1;

		var allBrandsDocs = {};

		if (currentState.currentCompanyId != -1) {
			_.forEach(defineCompanyBrands(companies.companies, currentState.currentCompanyId),  function(brandObj, i)  {
				// console.log(brandObj.name);
				_.forEach(brandObj.content,  function(type, i)  {
					if (!allBrandsDocs[i]) {
						allBrandsDocs[i] = [];
						allBrandsDocs[i].push(...type);
						// console.log(allBrandsDocs);
					} else {

						allBrandsDocs[i].push(...type);
					}
				});
			});


		} else {
			_.forEach(newdata.data.brands,  function(brandObj, i)  {
				// console.log(brandObj.name);
				_.forEach(brandObj.content,  function(type, i)  {
					if (!allBrandsDocs[i]) {
						allBrandsDocs[i] = [];
						allBrandsDocs[i].push(...type);
						// console.log(allBrandsDocs);
					} else {

						allBrandsDocs[i].push(...type);
					}
				});
			});
		}

		actualDocs.docsData = allBrandsDocs;
		// console.log(allBrandsDocs);
		// 	updateDocs();
	}

	function availableManagersClick(e) {
		brands.showselect = false;
		// console.log(this.value);

		var result = [];
		var options = this && this.options;
		var opt;

		for (var i = 0, iLen = options.length; i < iLen; i++) {
			opt = options[i];

			if (opt.selected) {
				result.push(opt.value || opt.text);
			}
		}
		// console.log(result);
		return result;
	}


	var
		nuu = {
			"id": "4",
			"name": "che",
			"brands": ["0", "6"]
		},
		nub = {
			"id": "5",
			"name": "5_GEL",
			"status": "1",
			"managers": [
				" Маша",
				" Сергей",
				" Абба",
				" Гурген"
			],
			"content": {
				"contacts": ["500", "001", "002", "003"],
				"docs": ["501", "005", "006", "007"],
				"actions": ["502", "009", "010", "011"],
				"calls": ["503", "013", "014", "015"]
			}
		};

	document.getElementById("button-add-company").onclick = addCompanyClick;

	document.getElementById("button-add-brand").onclick = addBrandClick;



	function addCompanyClick(argument) {
		newdata.data.companies.push(nuu);
	}


	function addBrandClick(argument) {
		newdata.data.brands.push(nub);
		newdata.data.companies[0].brands.push(nub.id);
	}



}



$(function() {
	//Новая заметка в календарь
	$.ajax({
		url: 'http://s43504rc.beget.tech/note/save',
		type: 'POST',
		data: {
			Note: {
				'appointed_time': '1493124400', //timestamp
				'content': '555' //text
			}
		},
		success: function(response) {
			console.log(response);
		}
	});

});

console.log(...[1,2,3]);