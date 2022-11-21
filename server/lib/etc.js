let sql;
const today = new Date();

makeSelect = (obj, table, where, opt) => {
    sql = `select * from ${table}`;

    if (where.length > 0) sql += `where ${where}`;
    if (opt.length > 0) sql += opt;

    return sql;
}

makeInsert = (obj, table) => {
    sql = `insert into ${table}`;

    
}

const date = () => {
    let y = today.getFullYear();
    let m = today.getMonth();
    let d = today.getDate();

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
    
    return `${y}-${m}-${d}`;
}

module.exports = date;
