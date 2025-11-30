
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const PROFILEHOME: string;
	export const LESSOPEN: string;
	export const ANTHROPIC_MODEL: string;
	export const KDE_FULL_SESSION: string;
	export const GITHUB_PAT: string;
	export const LANGUAGE: string;
	export const DEFAULT_MODEL: string;
	export const USER: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const LC_TIME: string;
	export const npm_config_user_agent: string;
	export const XDG_SEAT: string;
	export const GIT_EDITOR: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const KONSOLE_VERSION: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const SHLVL: string;
	export const npm_config_noproxy: string;
	export const HOME: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const OLDPWD: string;
	export const DESKTOP_SESSION: string;
	export const dowoo: string;
	export const npm_package_json: string;
	export const ANTHROPIC_DEFAULT_SONNET_MODEL: string;
	export const SHELL_SESSION_ID: string;
	export const GTK_RC_FILES: string;
	export const XDG_SEAT_PATH: string;
	export const KDE_SESSION_VERSION: string;
	export const dopresta: string;
	export const FNM_ARCH: string;
	export const LC_MONETARY: string;
	export const KONSOLE_DBUS_SESSION: string;
	export const MANAGERPID: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const SYSTEMD_EXEC_PID: string;
	export const IM_CONFIG_CHECK_ENV: string;
	export const SSH_ASKPASS: string;
	export const CHROME_EXECUTABLE: string;
	export const GSM_SKIP_SSH_AGENT_WORKAROUND: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const COLORTERM: string;
	export const KONSOLE_DBUS_WINDOW: string;
	export const COLOR: string;
	export const NVM_DIR: string;
	export const DEBUGINFOD_URLS: string;
	export const OKSCRAPER_API_KEY: string;
	export const IM_CONFIG_PHASE: string;
	export const WAYLAND_DISPLAY: string;
	export const XKB_DEFAULT_LAYOUT: string;
	export const FNM_VERSION_FILE_STRATEGY: string;
	export const FNM_LOGLEVEL: string;
	export const LOGNAME: string;
	export const WINDOWID: string;
	export const FNM_NODE_DIST_MIRROR: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const JOURNAL_STREAM: string;
	export const _: string;
	export const npm_config_prefix: string;
	export const npm_config_npm_version: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const XDG_SESSION_CLASS: string;
	export const COLORFGBG: string;
	export const ANTHROPIC_BASE_URL: string;
	export const TERM: string;
	export const XDG_SESSION_ID: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const npm_config_cache: string;
	export const GTK2_RC_FILES: string;
	export const ANTHROPIC_DEFAULT_OPUS_MODEL: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const SESSION_MANAGER: string;
	export const INVOCATION_ID: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_MENU_PREFIX: string;
	export const LC_ADDRESS: string;
	export const XKB_DEFAULT_MODEL: string;
	export const XDG_RUNTIME_DIR: string;
	export const ICEAUTHORITY: string;
	export const DISPLAY: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LC_TELEPHONE: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XAUTHORITY: string;
	export const LS_COLORS: string;
	export const FNM_DIR: string;
	export const npm_lifecycle_script: string;
	export const SSH_AUTH_SOCK: string;
	export const FNM_RESOLVE_ENGINES: string;
	export const SHELL: string;
	export const LC_NAME: string;
	export const ANTHROPIC_AUTH_TOKEN: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const LESSCLOSE: string;
	export const ANTROPIC_DEFAULT_HAIKU_MODEL: string;
	export const CLAUDECODE: string;
	export const KONSOLE_DBUS_SERVICE: string;
	export const domyamsdocker: string;
	export const LC_MEASUREMENT: string;
	export const LC_IDENTIFICATION: string;
	export const XDG_VTNR: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const FNM_MULTISHELL_PATH: string;
	export const npm_execpath: string;
	export const XDG_CONFIG_DIRS: string;
	export const ANDROID_HOME: string;
	export const XDG_DATA_DIRS: string;
	export const npm_config_global_prefix: string;
	export const LC_NUMERIC: string;
	export const npm_command: string;
	export const LC_PAPER: string;
	export const FNM_COREPACK_ENABLED: string;
	export const KDE_SESSION_UID: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		PROFILEHOME: string;
		LESSOPEN: string;
		ANTHROPIC_MODEL: string;
		KDE_FULL_SESSION: string;
		GITHUB_PAT: string;
		LANGUAGE: string;
		DEFAULT_MODEL: string;
		USER: string;
		PAM_KWALLET5_LOGIN: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		LC_TIME: string;
		npm_config_user_agent: string;
		XDG_SEAT: string;
		GIT_EDITOR: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		KONSOLE_VERSION: string;
		QT_WAYLAND_RECONNECT: string;
		SHLVL: string;
		npm_config_noproxy: string;
		HOME: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		OLDPWD: string;
		DESKTOP_SESSION: string;
		dowoo: string;
		npm_package_json: string;
		ANTHROPIC_DEFAULT_SONNET_MODEL: string;
		SHELL_SESSION_ID: string;
		GTK_RC_FILES: string;
		XDG_SEAT_PATH: string;
		KDE_SESSION_VERSION: string;
		dopresta: string;
		FNM_ARCH: string;
		LC_MONETARY: string;
		KONSOLE_DBUS_SESSION: string;
		MANAGERPID: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		SYSTEMD_EXEC_PID: string;
		IM_CONFIG_CHECK_ENV: string;
		SSH_ASKPASS: string;
		CHROME_EXECUTABLE: string;
		GSM_SKIP_SSH_AGENT_WORKAROUND: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		COLORTERM: string;
		KONSOLE_DBUS_WINDOW: string;
		COLOR: string;
		NVM_DIR: string;
		DEBUGINFOD_URLS: string;
		OKSCRAPER_API_KEY: string;
		IM_CONFIG_PHASE: string;
		WAYLAND_DISPLAY: string;
		XKB_DEFAULT_LAYOUT: string;
		FNM_VERSION_FILE_STRATEGY: string;
		FNM_LOGLEVEL: string;
		LOGNAME: string;
		WINDOWID: string;
		FNM_NODE_DIST_MIRROR: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		JOURNAL_STREAM: string;
		_: string;
		npm_config_prefix: string;
		npm_config_npm_version: string;
		MEMORY_PRESSURE_WATCH: string;
		XDG_SESSION_CLASS: string;
		COLORFGBG: string;
		ANTHROPIC_BASE_URL: string;
		TERM: string;
		XDG_SESSION_ID: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		npm_config_cache: string;
		GTK2_RC_FILES: string;
		ANTHROPIC_DEFAULT_OPUS_MODEL: string;
		npm_config_node_gyp: string;
		PATH: string;
		SESSION_MANAGER: string;
		INVOCATION_ID: string;
		NODE: string;
		npm_package_name: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		XDG_SESSION_PATH: string;
		XDG_MENU_PREFIX: string;
		LC_ADDRESS: string;
		XKB_DEFAULT_MODEL: string;
		XDG_RUNTIME_DIR: string;
		ICEAUTHORITY: string;
		DISPLAY: string;
		NoDefaultCurrentDirectoryInExePath: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		LC_TELEPHONE: string;
		XDG_SESSION_DESKTOP: string;
		XAUTHORITY: string;
		LS_COLORS: string;
		FNM_DIR: string;
		npm_lifecycle_script: string;
		SSH_AUTH_SOCK: string;
		FNM_RESOLVE_ENGINES: string;
		SHELL: string;
		LC_NAME: string;
		ANTHROPIC_AUTH_TOKEN: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		LESSCLOSE: string;
		ANTROPIC_DEFAULT_HAIKU_MODEL: string;
		CLAUDECODE: string;
		KONSOLE_DBUS_SERVICE: string;
		domyamsdocker: string;
		LC_MEASUREMENT: string;
		LC_IDENTIFICATION: string;
		XDG_VTNR: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		FNM_MULTISHELL_PATH: string;
		npm_execpath: string;
		XDG_CONFIG_DIRS: string;
		ANDROID_HOME: string;
		XDG_DATA_DIRS: string;
		npm_config_global_prefix: string;
		LC_NUMERIC: string;
		npm_command: string;
		LC_PAPER: string;
		FNM_COREPACK_ENABLED: string;
		KDE_SESSION_UID: string;
		MEMORY_PRESSURE_WRITE: string;
		INIT_CWD: string;
		EDITOR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
