(() => {
$.getJSON('//jsonplaceholder.typicode.com/users', function (json) {
  let data = '<ul>';
  for (let i = 0; i < json.length; i++) {
    data += "<li>"
    data += "<p>ほげ" + json[i].id + "</p>"
    data += "<p>" + json[i].name + "</p>"
    data += "</li>"
  }
  data += '</ul>'
  $('#app').html(data)
});

console.log("発火の確認をもう2度")

console.log('test')
class test {
  constructor() {}
  sum() {
    return 1 + 1
  }
}

  new test();

  })();
