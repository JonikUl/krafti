<template>
  <div class="p-5">
    <div v-if="$route.params.slug == 'reset'" class="alert alert-success text-center p-5 col-12 col-md-6 m-auto">
      <strong>Вы успешно сбросили свой пароль!</strong> Теперь можно указать новый в настройках профиля.
    </div>
    <div v-else class="alert alert-info text-center p-5 col-12 col-md-6 m-auto">
      <strong>Спасибо за подтверждение email!</strong>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  validate({params}) {
    return ['reset', 'confirm'].includes(params.slug)
  },
  async asyncData({app, query, params, error}) {
    try {
      const res = await app.$axios.get('security/confirm', {
        params: {
          type: params.slug,
          user_id: query.user_id,
          secret: query.secret,
        },
      })
      return res.data
    } catch (e) {
      return error({statusCode: e.status, message: e.data})
    }
  },
  async mounted() {
    if (this.$route.params.slug === 'reset' && this.token !== undefined) {
      try {
        await this.$auth.setUserToken(this.token)
        this.$notify.success({
          message: 'Вы успешно сбросили свой пароль! Теперь можно указать новый в настройках профиля.',
        })
      } finally {
        this.$router.replace(this.$route.query.from || '/')
      }
    } else if (this.$route.params.slug === 'confirm') {
      this.$notify.info({message: 'Спасибо за подтверждение email!'})
      this.$router.replace(this.$route.query.from || '/')
    }
  },
}
</script>
