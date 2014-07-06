define(['jquery','underscore','Backbone','views/headerview','views/homeview','views/aboutview','views/notfoundview'],function($,_,Backbone,HeaderView,HomeView,AboutView,NFView){
    var App=Backbone.Router.extend({
    	initialize:function(){
            console.log('This site is Created and maintained by Sarath');
            console.log('Visit http://saratonite.github.io  For more information.');
    		this.header=new HeaderView();
    	},
    	routes:{
    		'':'homePage',
            'home':'homePage',
    		'about':'aboutPage',
    		'*actions':'notfoundPage'
    	},
    	homePage:function(){
    		var home=new HomeView();
            this.markNav('home');
    	},
    	aboutPage:function(){
    		var about=new AboutView();
            this.markNav('about');
    	},
    	notfoundPage:function(actions){
            this.markNav('contact');
    		var nf=new NFView();
    	},
    	start:function(){

    		Backbone.history.start();
    	},
        markNav: function(route) {
            $(".masthead-nav").find('li').removeClass('active')
                .end()
                .find("a[href^='#" + route + "']").parent().addClass('active');
        }
    });
    return App;

});
