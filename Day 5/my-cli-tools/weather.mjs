import axios from 'axios';
import chalk from 'chalk';

const API_KEY = '4f77bb8ea2fd4b6ba9e120933251404';
const CITY = process.argv[2] || 'Mumbai';

async function getWeather(city) {
    try {
        const res = await axios.get(
            `http://api.weatherapi.com/v1//current.json?key=${API_KEY}&q=${city}`
        );

        const data = res.data;
        console.log(chalk.blue(`Weather is ${city}: `));
        console.log(chalk.green(`Temp: ${data.current.temp_c}°C`));
        console.log(chalk.yellow(`Condition: ${data.current.condition.text}`));

    } catch(err) {
        console.log(chalk.red('Could not found weather:'), err.message);
    }
}

getWeather(CITY);