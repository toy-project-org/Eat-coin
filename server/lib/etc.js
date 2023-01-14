let sql;
// const today = new Date();

const getToday = (today) => {
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    
    return `${y}-${m}-${d}`;
}

const date = (today) => {
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    console.log('today', y, m, d);
    d -= 7;

    if (d < 1) {
        if (d < 8) {
            if (d % 2 == 0) d += 31;
            else d += 32;
        } else {
            if (d % 2 == 0) d += 32;
            else d += 31;
        }

        m--;
    }

    if (m < 1) {
        m = 12;
        y--;
    }

    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;

    return `${y}-${m}-${d}`;
}

module.exports = date;
