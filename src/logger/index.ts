/// <reference path="/node_modules/wamper/types.d.ts" />
import Wamper from 'wamper'

export default class Logger {
  private _client: Wamper
  
  constructor(host: string = import.meta.env.VITE_WAMP_HOST) {
    /**
     * Инициализация WAMP клиента
     * @param {string} host
     */
    this._client = new Wamper(host, {
      security: false,
    })
  }
  
  /**
   * Авторизация
   * @returns {Promise<any>}
   */
  async login() {
    return await this._client.connection
      .then(async ()=>{
        await this._client.call('http://enter.local/login', 'enter', 'A505a')
      })
  }
  
  /**
   * Подписка на список логов
   * @returns {any}
   */
  subscribeLogs() {
    return this._client.subscribe('http://enter.local/subscription/logs/list')
  }
}