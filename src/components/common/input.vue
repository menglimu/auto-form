<!-- 参数  说明  类型  可选值 默认值
name    表单name  String  -   -
type    文本框类型   String  text, password, email, number, tel, datetime-local, date, time  text
placeholder 描述输入字段  String  -   -
readonly    是否只读    Boolean -   false
disabled    是否禁用    Boolean -   false
regex   验证验证，可为内置正则（email/mobile/bankcard）或自定义正则    String  -   -
autocomplete    自动完成    String  -   off
showClearIcon   是否显示清空内容图标  Boolean -   true
showErrorIcon   是否显示错误图标    Boolean -   true
showSuccessIcon 是否显示正确图标    Boolean -   true
required    是否必填    Boolean -   false
max 最大输入字符  Number  -   -
min 最少输入字符  Number  -   -
http://vue.ydui.org/docs/#/input
 -->
 <template>
    <div class="ms-input">
        <template v-if="regex == 'mobile'">
            <input type="tel" pattern="[0-9]*"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" maxlength="11" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
        </template>
        <template v-else>
            <template v-if="type == 'password'">
                <input v-if="!showPwd" type="password"
                       v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
                >
                <input v-if="showPwd" type="text"
                       v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
                >
            </template>
            <input v-if="type == 'text'" type="text"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'number'" type="number"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'email'" type="email"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'tel'" type="tel"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'datetime-local'" type="datetime-local"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'date'" type="date"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
            <input v-if="type == 'time'" type="time"
                   v-model="currentValue" :name="name" @focus="showClear = true" @blur="blurHandler" :maxlength="max" :placeholder="placeholder" :autocomplete="autocomplete" :readonly="readonly" :disabled="disabled"
            >
        </template>
        <a href="javascript:;" class="input-clear ion-ios-close" tabindex="-1" @click="clearInput" v-show="showClearIcon && showClear && !isempty"></a>
        <span class="input-error ion-ios-information" v-if="showErrorIcon" v-show="((!!regex || !!min || !!max || required) && type != 'password' && iserror) || checkRequired"></span>
        <span class="input-success ion-checkmark-circled" v-if="showSuccessIcon" v-show="(!!regex || !!min || !!max || required) && type != 'password' && !iserror && currentValue != ''"></span>
        <a href="javascript:;" v-if="type == 'password'" class="input-password" :class="showPwd ? 'input-password-open ion-eye' : 'ion-eye-disabled'" tabindex="-1" @click.stop="showPwd = !showPwd"></a>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-input',
        data() {
            return {
                currentValue: '',
                isempty: true,
                iserror: false,
                showPwd: false,
                showClear: false,
                checkRequired: false,
                valid: true,
                errorMsg: '',
                errorCode: '',
                regexObj: {
                    email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',
                    mobile: '^(86)?1[3,4,5,7,8]\\d{9}$',
                    bankcard: '^\\d{15,19}$',
                    card: '^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$'
                }
            }
        },
        props: {
            name: String,
            placeholder: String,
            value: [String, Number],
            readonly: Boolean,
            disabled: Boolean,
            regex: String,
            autocomplete: {
                type: String,
                default: 'off'
            },
            showClearIcon: {
                type: Boolean,
                default: true
            },
            showErrorIcon: {
                type: Boolean,
                default: true
            },
            showSuccessIcon: {
                type: Boolean,
                default: true
            },
            required: {
                type: Boolean,
                default: false
            },
            type: {
                validator (value) {
                    return ['text', 'password', 'email', 'number', 'tel', 'datetime-local', 'date', 'time'].indexOf(value) > -1;
                },
                default: 'text'
            },
            max: {
                validator(val) {
                    return /^\d*$/.test(val);
                }
            },
            min: {
                validator(val) {
                    return /^\d*$/.test(val);
                }
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.isempty = !val;
                this.validatorInput(val, true);
                this.emitInput();
            },
            required(val) {
                this.required = val;
                this.validatorInput(this.currentValue, false);
            }
        },
        methods: {
            init() {
                this.currentValue = this.value;
                if (this.required && this.currentValue == '') {
                    this.setError('不能为空', 'NOT_NULL');
                    return;
                }
                if (this.min && this.currentValue.length < this.min) {
                    this.setError(`最少输入${this.min}位字符`, 'NOT_MIN_SIZE');
                }
            },
            validatorInput(val, showError) {
                if (val == '' || typeof(val) == "undefined") {
                    if (this.required) {
                        this.setError('不能为空', 'NOT_NULL');
                        this.iserror = showError;
                        this.checkRequired = showError;
                    }
                    return;
                }
                this.checkRequired = false;
                if (this.min && val.length < this.min && val.length != 0) {
                    this.setError(`最少输入${this.min}位字符`, 'NOT_MIN_SIZE');
                    this.iserror = true;
                    return;
                }
                const v = this.regex == 'bankcard' ? val.replace(/\s/g, '') : val;
                const reg = this.regexObj[this.regex] ? this.regexObj[this.regex] : this.trim(this.regex, '/');
                if (this.regex && !new RegExp(reg).test(v)) {
                    this.setError('输入字符不符合规则', 'NOT_REGEX_RULE');
                    this.iserror = true;
                    return;
                }
                this.iserror = false;
                this.valid = true;
                this.errorMsg = '';
                this.errorCode = '';
            },
            blurHandler() {
                this.validatorInput(this.currentValue, true);
                setTimeout(() => {
                    this.showClear = false;
                }, 200);
            },
            clearInput() {
                this.currentValue = '';
                this.emitInput();
            },
            emitInput() {
                if (this.regex == 'bankcard') {
                    if (this.currentValue && /\S{5}/.test(this.currentValue)) {
                        this.currentValue = this.currentValue.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
                    }
                    this.$emit('input', this.currentValue.replace(/\s/g, ''));
                    return;
                }
                // if (this.regex == 'card') {
                //     if (this.currentValue && /\S{5}/.test(this.currentValue)) {
                //         this.currentValue = this.currentValue.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
                //     }
                //     this.$emit('input', this.currentValue.replace(/\s/g, ''));
                //     return;
                // }
                this.$emit('input', this.currentValue);
            },
            setError(error, code) {
                this.errorMsg = error;
                this.errorCode = code;
                this.valid = false;
            },
            trim(str, char) {
                if (!!str) {
                    return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
                }
                return str;
            }
        },
        created() {
            this.init();
        }
    }
</script>
<style lang="scss" scoped>
    .ms-input {
        background-color: #FFF;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
          display: flex;
          width: 100%;
          height: 100%;
          min-height: 0.5rem;
          align-items: center;
          > input {
            display: block;
            width: 100%;
            height: 100%;
            border: none;
            font-size: inherit;
            background: none;
          }
          > .input-clear,
          > .input-error,
          > .input-password,
          > .input-success {
            padding-left: .2rem;
            display: flex;
            align-items: center;
          }
          > .input-clear {
              color: #B2B2B2;
              font-size: .4rem;
          }
          > .input-error {
              color: #F43530;
              font-size: .4rem;
          }
          > .input-success {
              color: #09BB07;
              font-size: .4rem;
          }
          > .input-password {
              color: #B2B2B2;
              font-size: .45rem;
          }
          > .input-password-open {
            color: #434343;
          }
    }
</style>