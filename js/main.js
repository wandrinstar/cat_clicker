$(function(){
  var currentCat;

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
      viewList.init();
      viewImage.render();
      viewForm.init();
    },

    getAllCats: function() {
      return model.allCats;
    },

    updateCurrentCat: function(clickedElem) {
      currentCat = model.allCats[clickedElem.attr('cat-id')];
    },

    updateClicks: function(){
      currentCat.numClicks += 1;
      return currentCat.numClicks;
    },

    updateFormData: function(data) {
      currentCat.name = data[0].value;
      currentCat.imgURL = data[1].value;
      currentCat.numClicks  = parseInt(data[2].value);
      viewForm.init();

      $('#cat-list').empty();
      viewList.init();
      $('.display-container').empty();
      viewImage.render();
    }
  }


  var viewList = {
    init: function() {
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
        octopus.updateCurrentCat($(this));
        var displayElems = '<h3>' + currentCat.name + '</h3>' + '<p class="numClicks">' + currentCat.numClicks + '</p>' + '<img src="' + currentCat.imgURL + '"/>';
        $('.display-container').empty().append(displayElems);
        viewImage.clickListener();
        viewForm.fillForm();
      });
    },

    clickListener: function() {
      $('img').click(function() {
        var numClicks = octopus.updateClicks();
        $('.numClicks').text(numClicks);
        viewForm.fillForm();
      });
    }
  }

  var viewForm = {
    init: function(){
      $('form').hide();
      $('#button-admin').click(function() {
        $('form').show();
      });
      $('#button-cancel').click(function(){
        $('form').hide();
      });
    },

    fillForm: function() {
      $('input[name="name"]').val(currentCat.name);
      $('input[name="imgURL"]').val(currentCat.imgURL);
      $('input[name="numClicks"]').val(currentCat.numClicks);
      $('#form-admin').submit(function(e){
        e.preventDefault();
        var data = $("#form-admin").serializeArray();
        octopus.updateFormData(data);
      });
    }
  }

  octopus.init();
});
