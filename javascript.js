//---------------------------------------------------------------
document.write(`<p id="clock"></p>`);
function realTime() {
    const nowTime = new Date(); //  現在日時を得る
    const nowYear = nowTime.getFullYear();
    const nowMonth = doubleDigits(nowTime.getMonth() + 1);
    const nowDate = doubleDigits(nowTime.getDate());
    const nowDay = week(nowTime.getDay());
    const nowHour = doubleDigits(nowTime.getHours()); // 時を抜き出す
    const nowMin = doubleDigits(nowTime.getMinutes()); // 分を抜き出す
    const nowSec = doubleDigits(nowTime.getSeconds()); // 秒を抜き出す
    const msg = `現在時刻は${nowHour}:${nowMin}:${nowSec}です。${nowYear}年${nowMonth}月${nowDate}日（${nowDay}曜日）です。`;
    document.getElementById("clock").innerHTML = msg;
}
function doubleDigits(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}
function week(nowDay) {
    const weeks = ['日', '月', '火', '水', '木', '金', '土'];
    return weeks[nowDay];
}
setInterval('realTime()', 1000);
//---------------------------------------------------------------

//---------------------------------------------------------------
let nowYear = new Date().getFullYear();
let nowMonth = new Date().getMonth() + 1;


document.write(`<div id="calendar">${getFirstLastDate(nowYear, nowMonth)}</div>`);
document.write(`<button type="button" onclick="calendar('minus')">マイナス</button>`);
document.write(`<button type="button" onclick="calendar('plus')">プラス</button>`);

function getFirstLastDate(year, month) {
    const first = new Date(year, month - 1, 1);
    const last = new Date(year, month, 0);

    const lastDay = last.getDate();
    const firstYoubi = first.getDay();
    const lastYoubi = last.getDay();

    let newCalendar = '';
    newCalendar += `<p>${year}年${month}月</p>`;
    newCalendar += '<table border="1">';
    newCalendar += '<tr>';

    const weeks = ['日', '月', '火', '水', '木', '金', '土'];
    for (let week of weeks) newCalendar += `<th>${week}</th>`;
    newCalendar += `</tr>`;

    const al = lastDay + firstYoubi + (6 - lastYoubi);
    for (let i = 1; i <= al; i++) {
        if (i % 7 === 1) newCalendar += `<tr>`;

        if (i < firstYoubi + 1 || i > lastDay + firstYoubi) {
            newCalendar += `<th></th>`;
        } else {
            if (i % 7 === 0) newCalendar += `<th style='color:blue'>${i - firstYoubi}</th>`;
            else if (i % 7 === 1) newCalendar += `<th style='color:red'>${i - firstYoubi}</th>`;
            else newCalendar += `<th>${i - firstYoubi}</th>`;
        }

        if (i % 7 === 0) newCalendar += `</tr>`;
    }

    newCalendar += '</table>';

    return newCalendar;
}

function calendar(plusOrMinus) {
    document.getElementById('calendar').textContent = '';
    if (plusOrMinus === 'plus') {
        if (nowMonth === 12) {
            nowMonth = 1;
            nowYear++;
        } else nowMonth++;

    } else if (plusOrMinus === 'minus') {
        if (nowMonth === 1) {
            nowMonth = 12;
            nowYear--;
        } else nowMonth--;
    }

    document.getElementById("calendar").insertAdjacentHTML('afterbegin', getFirstLastDate(nowYear, nowMonth));
}

window.onload = function () {
}
//---------------------------------------------------------------