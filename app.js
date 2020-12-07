$(() => {
//carousel
  let currentImg = 0;
  let images = $('.dad-carousel').children().length -1;
  const names = ['Alan','Steve','Dave']

  $('.next').on('click', () => {
    $('.output').empty();
    $('.output2').empty();
    $('.output3').empty();

  $('.dad-carousel').children().eq(currentImg).css('display','none');
  if (currentImg < images) {
    currentImg++;
  }
  else {
    currentImg = 0;
  }
  $('.dad-carousel').children().eq(currentImg).css('display','block')

  });

  $('.previous').on('click', ()=>{
    $('.output').empty();
    $('.output2').empty();
    $('.output3').empty();
  $('.dad-carousel').children().eq(currentImg).css('display','none');
  if(currentImg > 0) {
    currentImg--;
  }
  else {
    currentImg = images;
  }
  $('.dad-carousel').children().eq(currentImg).css('display','block');
  })

//tooltip
$(document).on('hover', () => {
  $('[data-toggle=tooltip]').tooltip();
});

//api and joke delivery
  $('.buttons').on('click', (event) => {
    //event.preventDefault();
    $('.output').empty();
    $('.output2').empty();
    $('.output3').empty();

    let $joke = $(event.target).attr('id');

  $.ajax({
       url : `https://sv443.net/jokeapi/v2/joke/${$joke}`

  }).then(
    (data)=> {
      const $setup = $('<h3>').text(data.setup)
      const $delivery = $('<h3>').text(data.delivery).css('color', 'gold')
      $('.output').append($setup)
      setTimeout(
        ()=>{
          $('.output').append($delivery)
        },
        3500
      )
// //create go-to button
  $('<button>').addClass('setJoke').text('Set As \'Go-To\' Joke').prependTo('.output')

//set go-to joke within 1st click event
$('.setJoke').on('click', (event) => {
  $('.goto').empty();
  localStorage.setItem('setup', data.setup)
  localStorage.setItem('delivery', data.delivery)
  let setup = localStorage.getItem('setup')
  let delivery = localStorage.getItem('delivery')

  //$('.goto').append(`Go-To Joke: ${data.setup}`).append(`---${data.delivery}`).css('font-style','italic')
$('.goto').append(`Go-To Joke:${setup}---${delivery}`).css('color','gold')
})
    },
    (error)=> {
      }
     )
   })

   //retrieve go-to joke
   $('.goToJoke').on('click', (event) => {
     event.preventDefault()
     // localStorage.setItem('setup', data.setup)
     // localStorage.setItem('delivery', data.delivery)
     let setup = localStorage.getItem('setup')
     let delivery = localStorage.getItem('delivery')
     $('.goto').append(`Go-To Joke: ${setup}---${delivery}`).css('color','gold')
     $('.goToJoke').hide()
   })

//weather app
$('form').on('submit', (event)=> {
  event.preventDefault();
  $('.output').empty();
  $('.output2').empty();
  $('.output3').empty();

  let $city = $('input[type="text"]').val();

  $.ajax({
    url:`https://api.openweathermap.org/data/2.5/weather?q=${$city}&units=imperial&APPID=86484c24a5840c46aad058f021925a56`
  }).then(
    (data)=> {
      const $temp = $('<h4>').text(`Temperature: ${data.main.temp} F`);
      const $description = $('<h4>').text(`Conditions: ${data.weather[0].description}`)
      const $wind = $('<h4>').text(`Wind: ${data.wind.speed} MPH`)
      const $humidity = $('<h4>').text(`Humidity: ${data.main.humidity} %`)
      $('.output2').append($city).append($temp).append($description).append($wind).append($humidity)
      $('.form').trigger('reset');
      console.log(data)

      //phrases
      const phrases = ['"Don\'t touch that thermostat, put on a sweater!"','"Great day for some yardwork! Might fire up the grill later..."','"It\'s not the heat that gets you, its the humidity!"']

      if (data.main.temp <= 55) {
        $('.output3').text(phrases[0]).css('color','gold')
      } else if (data.main.temp <= 75){
        $('.output3').text(phrases[1]).css('color','gold')
      } else {
        $('.output3').text(phrases[2]).css('color','gold')
      }

    },
    ()=>{
      //console.log('error')
    }
  )

})

}) //ending token
