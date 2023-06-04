export function generateCodeUser () {
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digit = '0123456789';
    let code = '';
    for (let i = 0; i < 3; i++) {
        code += ABC[Math.floor(Math.random() * ABC.length)];
    }
    for (let i = 0; i < 7; i++) {
        code += digit[Math.floor(Math.random() * digit.length)];
    }
    return code;
}