// Configuration
import config from './config'

// Configurations
export const $db = () => config.db
export const $port = () => config.serverPort
export const $dev = () => config.dev
export const $auth = () => config.auth
export const $email = () => config.email
