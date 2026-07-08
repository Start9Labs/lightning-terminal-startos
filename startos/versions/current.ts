import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../fileModels/lit.conf'

export const current = VersionInfo.of({
  version: '0.17.0-alpha:1',
  releaseNotes: {
    en_US: `- Fixes the Create/Reset Password action so a newly generated password takes effect immediately instead of being ignored until the next restart.
- Restores the correct "Create Password" label before a password has been set.`,
    es_ES: `- Corrige la acción Crear/Restablecer contraseña para que una contraseña recién generada surta efecto de inmediato en lugar de ignorarse hasta el siguiente reinicio.
- Restaura la etiqueta correcta «Crear contraseña» antes de que se haya establecido una contraseña.`,
    de_DE: `- Behebt die Aktion „Passwort erstellen/zurücksetzen“, sodass ein neu generiertes Passwort sofort wirksam wird, statt bis zum nächsten Neustart ignoriert zu werden.
- Stellt die korrekte Bezeichnung „Passwort erstellen“ wieder her, solange noch kein Passwort gesetzt ist.`,
    pl_PL: `- Naprawia akcję Utwórz/Zresetuj hasło, dzięki czemu nowo wygenerowane hasło działa natychmiast, zamiast być ignorowane do następnego restartu.
- Przywraca poprawną etykietę „Utwórz hasło”, zanim hasło zostanie ustawione.`,
    fr_FR: `- Corrige l'action Créer/Réinitialiser le mot de passe pour qu'un mot de passe nouvellement généré prenne effet immédiatement au lieu d'être ignoré jusqu'au prochain redémarrage.
- Rétablit le libellé correct « Créer le mot de passe » tant qu'aucun mot de passe n'a été défini.`,
  },
  migrations: {
    up: async ({ effects }) => {
      const configYaml:
        | {
            password: string
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await litConfig.merge(effects, {
          uipassword: configYaml.password,
        })

        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        })
      }
    },
    down: IMPOSSIBLE,
  },
})
