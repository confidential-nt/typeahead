const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

//filter를 사용해야한다

const cities = [];//let 안하고 어레이 내용 변경 시 push 사용

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)//promise생성->then 해줘야 데이터 옴
.then(blob => blob.json())//blob자체가 뭔 데이터인지 알 수 없음. 그냥 데이터 방울. blob의 프로토타입에 내장되어있는 json으로 json 형식으로 바꿔줘야 => 새로운 promise 생성
.then(data => cities.push(...data))//전개구문(spread)없이 그냥 data를 푸시하게 되면 어레이 안에 어레이가 있게 됨. 이는 알규먼트를 미리 만들어 둔 어레이 안에 들여오는 push의 특성탓이기도 함. 따라서 전개구문 이용해라 


function findMatches(wordToMatch, cities){
    return cities.filter( place => {
        const regex= new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMathches(){
    const matchArray = findMatches(this.value,cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value,'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `<li> <span class="name">${cityName} ${stateName}</span> <span class="population">${numberWithCommas(place.population)}</span></li>`
    }).join('');
    suggestions.innerHTML = html;
}

searchInput.addEventListener("change",displayMathches)
searchInput.addEventListener("keyup",displayMathches)

