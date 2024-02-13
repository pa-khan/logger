declare module logger {
  type LogsResult<T = LogsSuccess | LogsError> = [MessageType, Uri, T]
  
  type LogsSuccess = Logs
  type LogsError = {
    SubscribeError: string
  }
  
  type Logs = {
    Actions: 0 | 3
    Items: LogItem[]
  }
  
  type LogItem = {
    Timestamp: string
    Level: LogItemLevel
    Message: string
    Source: string
  }
  
  type LogItemLevel = 'FATAL' | 'ERROR' | 'DEBUG' | 'INFO' |'TRACE' | 'WARN'
  
  /**
   * Used to make searching easier
   */
  type Log = {
    /**
     * Level
     */
    l: LogItemLevel
    /**
     * Message
     */
    v: string
  }
}