
// Dependencies

import * as fs from 'fs';
import * as path from 'path';
import * as jsonfile from 'jsonfile';

// Local

import { Config } from "../types";

// Constants

const CONFIG_FILE = 'config.json';
const CONFIG_PATH = path.join(__dirname, '..', '..', CONFIG_FILE);

export default class ConfigurationManager
{
	public static load(): Config
	{
		if (!fs.existsSync(CONFIG_PATH))
			throw new Error(`Config file not found: ${CONFIG_PATH}`);
		return jsonfile.readFileSync(CONFIG_PATH) as Config;
	}
}
