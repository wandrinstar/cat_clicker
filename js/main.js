$(function(){

  var model = {
    catData: [["https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg", 'Bob'],
              ["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 'Hal'],
              ['https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg', 'Jin'],
              ['https://upload.wikimedia.org/wikipedia/commons/1/1e/Large_Siamese_cat_tosses_a_mouse.jpg', 'Joe'],
              ['http://mcdaniel.hu/wp-content/uploads/2015/01/6784063-cute-cats-hd.jpg', 'Wie']],

    allCats: [],

    createCat: function(imgURL, name, id) {
      var cat = {imgURL: imgURL,
                name: name,
                id: id,
                numClicks: 0
                }
      return cat
    },

    createAllCats: function() {
      for (var i in model.catData) {
        var catInfo = model.catData[i];
        var cat = model.createCat(catInfo[0], catInfo[1], i);
        model.allCats.push(cat);
      }
    },
  }


  var octopus = {
    init: function() {
      model.createAllCats();
      viewList.render();
      viewImage.render();
    },

    getAllCats: function() {
      return model.allCats;
    },

    getClickedCat: function(clickedElem) {
      return model.allCats[clickedElem.attr('cat-id')];
    },

    updateClicks: function(cat){
      cat.numClicks += 1;
      return cat.numClicks;
    }
  }


  var viewList = {
    render: function() {
      var allCats = octopus.getAllCats();
      for (var i in allCats){
        var listElem = '<li class="myButton" cat-id="' +  allCats[i].id + '">' + allCats[i].name + '</li>';
        $('#cat-list').append(listElem);
      }
    }
  }


  var viewImage = {
    render: function() {
      $('.myButton').click(function() {
        var cat = octopus.getClickedCat($(this));
        var displayElems = '<p>' + cat.name + '</p>' + '<p class="numClicks">' + cat.numClicks + '</p>' + '<img src="' + cat.imgURL + '"/>';
        $('.display-container').empty().append(displayElems);
        viewImage.clickListener(cat);
      });
    },

    clickListener: function(cat) {
      $('img').click(function() {
        var numClicks = octopus.updateClicks(cat);
        $('.numClicks').text(numClicks);
      });
    }
  }

  octopus.init();
});
