web: gunicorn eduCRM.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=eduCRM worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=eduCRM beat -S redbeat.RedBeatScheduler --loglevel=info
