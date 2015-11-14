Router.map(function(){
	this.route('rentals');
});
export default Ember.Route.extend({
	model(){
	return rentals;
	}
});


<ul>
	{{#each model as [rental]}}
		{{rental-tile rental=rental}}
	{{/each}}
</ul>
