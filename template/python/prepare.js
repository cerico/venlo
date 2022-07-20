import { scaleLinear } from "d3"
import { execSync } from 'child_process'

const nations = execSync("python3 src/python/init.py");
const data = JSON.parse(nations.toString("utf8"));

export default data