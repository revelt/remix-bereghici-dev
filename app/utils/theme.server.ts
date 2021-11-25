import {createCookieSessionStorage} from 'remix'
import {getRequiredServerEnvVar} from './misc'
import {Theme, isTheme} from './theme-provider'

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'bereghici_dev_theme',
    secure: true,
    sameSite: 'lax',
    secrets: [getRequiredServerEnvVar('SESSION_SECRET')],
    path: '/',
    expires: new Date('2100-08-14'),
    httpOnly: true,
  },
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))

  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export {getThemeSession}