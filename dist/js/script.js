"use strict";
/* lesson 7 */
// alert('Hello!');

// const resalt = confirm("Are you here?");

// console.log(resalt);

// const answer = +prompt("Вам есть 18?", "18");

// console.log(answer + 5);

// const answers = [];

// answers[0] = prompt('Какое ваше имя?', '');
// answers[1] = prompt('Какая ваша фамилия?', '');
// answers[2] = prompt('Сколько вам лет?', '');

// console.log(answers);
// console.log(typeof(null));

/* lesson 8 интерполяция*/

// const category = 'toys';

// console.log(`http://someurl/${category}/5`);

// const user = 'Вова';

// alert(`Привет, ${user} пизда у коровы !!!`);

/* lesson 8 операторы*/

// console.log('arr' + ' - object');
// console.log(4 + +'5');

// let incr = 10,
//     decr = 10;

/* префиксный */

// incr++;
// decr--;

/* постфиксный */

// ++incr;
// --decr;


// console.log(incr++);
// console.log(decr--);
// console.log(incr++);
// console.log(decr--);


/* условия */

//  if(4 == 4){
//     console.log('Ok!');
//  }else{
//     console.log('Error');
//  }

//  const num = 50;

//  if(num < 49){
//     console.log('Error');
//  } else if(num > 100){
//     console.log('Owercup');
//  } else {
//     console.log('Ok!');
//  }

/* условия тернарный оператор*/

// const num = 50;

// (num === 50) ? console.log('Ok!') : console.log('Error');

/* условия switch*/

// const num = 51;

// switch (num){
//    case 49:
//       console.log('Неверно.');
//       break;
//    case 100:
//       console.log('Неверно.');
//       break;
//    case 50:
//       console.log('В точку!');
//       break;
//    default:
//       console.log('Не в этот раз.');
//       break;
// }

/* Create application */

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
   count: numberOfFilms,
   movies: {},
   actors: {},
   genres: [],
   private: false
};

const a = prompt('Один из последних просмотренных фильмов?', ''),
   b = +prompt('На сколько оцените его?', ''),
   c = prompt('Один из последних просмотренных фильмов?', ''),
   d = +prompt('На сколько оцените его?', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);