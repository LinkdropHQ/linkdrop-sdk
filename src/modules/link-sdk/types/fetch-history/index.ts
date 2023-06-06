import { AxiosResponse } from 'axios'

type TArgs = { sender: string, token: string }
type TFetchHistory = (args: TArgs) => Promise<AxiosResponse>

export default TFetchHistory