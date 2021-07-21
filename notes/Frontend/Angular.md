# Angular

## 1. 框架背景

Angular 是一个由 Google维护的开源JavaScript框架，用于在HTML和JavaScript中构建Web应用程序，是三大框架之首。

不管是1还是2，Angular最显著的特征就是其**整合性**。涵盖了M、V、C/VM等各个层面，不需要组合、评估其它技术就能完成大部分前端开发任务。这样可以有效降低决策成本，提高决策速度，对需要快速起步的团队是非常有帮助的。

由于它是从一个用来做原型的框架演化而来的，加上诞生时间很早（2009年，作为对比，jQuery诞生于2006年），当时生态不完善，连模块化机制都得自己实现。

但Angular 2就不同了，发布于2016年9月份，它是基于ES6来开发的，它的起点更高，整合了现代前端的各种先进理念，在框架、文档、工具等各个层面提供了全方位的支持

在Angular 中最具特色的就是**依赖注入**系统了，它把后端开发中用来解决复杂问题、实现高弹性设计的技术引入了前端



## 2. Angular CLI

###   	2.1 安装

​	Angular CLI用于简单，快速构建Angular2项目，只要掌握几行命令就能扣减前端架构。依赖于NodeJs和npm。

```jsx
//安装脚手架
npm install -g angular-cli
//创建项目
ng new project_name(项目名称)
//启动项目
cd project_name
ng serve --open 
```

 

### 	2.2 主要特性

1. Angular CLI 可以快速搭建框架，创建module，service，class，directive等；
2. 具有webpack的功能，代码分割，按需加载；
3. 代码打包压缩；
4. 模块测试；
5. 热部署，有改动立即重新编译，不用刷新浏览器；而且速度很快
6.  有开发环境，测试环境，生产环境的配置，不用自己操心； 
7.  sass，less的预编译Angular CLI都会自动识别后缀来编译；
8. typescript的配置，Angular CLI在创建应用时都可以自己配置；
9.  在创建好的工程也可以做一些个性化的配置，webpack的具体配置还不支持，未来可能会增加；
10.  Angular CLI创建的工程结构是最佳实践，生产可用；



### 	2.3 创建module，component，service，class



​    

## 3. 架构

### 	3.1 模块

​		模块组件的特征在于可以用于执行单个任务的代码块。 您可以从代码(类)中导出值。 Angular应用程序被称为模块，并使用许多模块构建您的应用程序。 Angular 的基本构建块是可以从模块导出的**组件**类。

```js
export class AppComponent {
  title = '朝夕教育';
}

```

### 	3.2 组件

组件是拥有模板的控制器类，主要处理页面上的应用程序和逻辑的视图。 组件可以拥有独立的样式。
注册组件，使用 *@Component* 注释，可以将应用程序拆分为更小的部分。

#### 3.2.1 创建组件

使用ng命令`ng generate component <component-name>`创建的组件会自动生成在`app.module`中的引用，推荐使用ng命令生成组件

```jsx
//快速创建
ng g c xxx
```

```jsx
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```

@Component最常用的几个选项:

**selector**：这个 CSS 选择器用于在模板中标记出该指令，并触发该指令的实例化。

**template**：组件的内联模板

**templateUrl**：组件模板文件的 URL

**styleUrls**：组件样式文件

**styles**：组件内联样式



#### 3.2.2 组件生命周期

​	Angular 会按以下顺序执行钩子方法。你可以用它来执行以下类型的操作。

| 钩子方法                  | 用途                                                         | 时机                                                         |
| :------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `ngOnChanges()`           | 当 Angular 设置或重新设置数据绑定的输入属性时响应。 该方法接受当前和上一属性值的 `SimpleChanges` 对象注意，这发生的非常频繁，所以你在这里执行的任何操作都会显著影响性能。 | 在 `ngOnInit()` 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。注意，如果你的组件没有输入，或者你使用它时没有提供任何输入，那么框架就不会调用 `ngOnChanges()`。 |
| `ngOnInit()`              | 在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。 | 在第一轮 `ngOnChanges()` 完成之后调用，只调用**一次**。      |
| `ngDoCheck()`             | 检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。 | 紧跟在每次执行变更检测时的 `ngOnChanges()` 和 首次执行变更检测时的 `ngOnInit()` 后调用。 |
| `ngAfterContentInit()`    | 当 Angular 把外部内容投影进组件视图或指令所在的视图之后调用。 | 第一次 `ngDoCheck()` 之后调用，只调用一次。                  |
| `ngAfterContentChecked()` | 每当 Angular 检查完被投影到组件或指令中的内容之后调用        | `ngAfterContentInit()` 和每次 `ngDoCheck()` 之后调用         |
| `ngAfterViewInit()`       | 当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用 | 第一次 `ngAfterContentChecked()` 之后调用，只调用一次。      |
| `ngAfterViewChecked()`    | 每当 Angular 做完组件视图和子视图或包含该指令的视图的变更检测之后调用。 | `ngAfterViewInit()` 和每次 `ngAfterContentChecked()` 之后调用。 |
| `ngOnDestroy()`           | 每当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏 | 在 Angular 销毁指令或组件之前立即调用。                      |

#### 3.2.3 组件交互

1. ​	**@Input**

       父组件通过`@Input`给子组件绑定属性设置输入类数据

    ```jsx
    //父组件
    <app-hello  [name]="'tina'"></app-hello>
    
    //子组件
    import { Component, Input } from '@angular/core';
    @Input()
      name!: string;
     ngOnInit(): void {
        console.log(this.name)
      }
    ```

2. ​	**@Output**

    ​	父组件给子组件传递一个事件，子组件通过`@Output`弹射触发事件

    ```jsx
    //父组件
     <app-hello  (addList)="addListFun($event)"  [name]="'tina'"></app-hello>
     
    list:number[] = [1,2,3,4]
      addListFun(num:number){
        this.list.push(num)
      }
    
    //子组件
    import { Component, Output,EventEmitter } from '@angular/core';
    @Output() addList = new EventEmitter()
      pushList(v:string){
        console.log(this.inpValue)
          this.addList.emit(v)
      }
    ```

3. ​    **@ViewChild()**

       通过`ViewChild`获取子组件实例，获取子组件数据

    ```jsx
    <app-hello #myChild  [name]="'tina'"></app-hello>
    <button (click)="getView($event)">获取</button>
    
    
    @ViewChild('myChild') child: any;
      constructor() { }
    
      ngOnInit(): void {
      }
      getView(e:any){
        console.log(this.child)
        this.child.setInpValue('我是一段数据')
      }
    ```

    

### 	3.3 模板

在 Angular 中，**模板**就是一块 HTML。在模板中，你可以通过一种特殊语法来使用 Angular 的许多功能

#### 	3.3.1 插值语法

​		所谓 "插值" 是指将表达式嵌入到标记文本中。 默认情况下，插值会用双花括号 `{{` 和 `}}` 作为分隔符		

```js
<h3>hello {{ name }}</h3>
```

​		花括号之间的文本通常是组件属性的名字。Angular 会把这个名字替换为响应组件属性的字符串值

​		括号间的素材是一个**模板表达式**我们可以在`{{}}`内编写js运算

```jsx
<h3>hello {{ 1+1 }}</h3>
```

#### 	3.3.2  属性绑定

1.  **Attribute绑定**

    ```jsx
    <h3 [id]="'h3-dom'">hello {{ 1+1 }}</h3>
    ```

2.  **类绑定**

    ```jsx
    //单一类绑定
    <h3 [class.h3-dom]="true">hello {{ 1+1 }}</h3>
    
    //多重类绑定
    <h3 [class]="'h3-dom title-dom min-title'">hello {{ 1+1 }}</h3>
    <h3 [class]="{'h3-dom':true,'title-dom':false}">hello {{ 1+1 }}</h3>
    <h3 [class]="['h3-dom','title-dom']">hello {{ 1+1 }}</h3>
    
    //ngClass
    export class AppComponent {
        isActive = true;
    }
    
    <h3 [ngClass]="{'active': isActive}">hello {{ 1+1 }}</h3>
    
    ```

3.  **样式绑定**

    ```jsx
    //单一样式绑定
    <h3 [style.width]="'300px'">hello {{ 1+1 }}</h3>
    
    //带单位的单一样式绑定
    <h3 [style.width.px]="'300'">hello {{ 1+1 }}</h3>
    
    //多重样式绑定
    <h3 [style]="'background:red;color:#fff'">hello {{ 1+1 }}</h3>
    <h3 [style]="{'background':'red','color':'#fff'}">hello {{ 1+1 }}</h3>
    
    //ngStyle
    export class AppComponent {
        isMax = false;
    }
    <h3 [ngStyle]="{'color': 'red'}">hello {{ 1+1 }}</h3>
    <h3 [ngStyle]="{'font-size': isMax ? '24px' : '12px'}">hello {{ 1+1 }}</h3>
    ```

#### 	3.3.3  条件判断

​			 ***ngIf**是直接影响元素是否被渲染，而非控制元素的显示和隐藏

```jsx
export class AppComponent {
    isMax = false;
    isMin = false;
}
<div *ngIf="isMax">Max title</div>
<div *ngIf="isMin">Min title</div>

//解析完
<ng-template [ngIf]="isMax">
  <div>Max title</div>
</ng-template>

<ng-container *ngIf="isMax; else elseTemplate">
       isMax为true
</ng-container>
<ng-template #elseTemplate>
    isMax为false
</ng-template>
```

####     3.3.4 循环语句

​	解析器会把 `let color`、`let i` 和 `let odd` 翻译成命名变量 `color`、`i` 和 `odd`

微语法解析器接收of，会将它的首字母大写(Of)，然后加上属性的指令名(ngFor)前缀，它最终生成的名字是 ngFor 的输入属性(colors)

`NgFor` 指令在列表上循环，每个循环中都会设置和重置它自己的上下文对象上的属性。 这些属性包括 `index` 和 `odd` 以及一个特殊的属性名 `$implicit`(隐式变量)

Angular 将 let-color 设置为此上下文中 $implicit 属性的值， 它是由 NgFor 用当前迭代中的 colors 初始化的

```jsx
export class AppComponent {
      colors:Array<string> = [ 'red', 'blue', 'yellow', 'green' ];
}

<div *ngFor="let color of colors let i=index let odd=odd">
  {{odd}}
  {{i}}
  {{color}}
</div>

//解析完
<ng-template ngFor let-color [ngForOf]="colors" let-i="index" let-odd="odd">
  <div>{{odd}} {{i}} {{color}}</div>
</ng-template>
```

```jsx
export class AppComponent {
    status = 1;
}

  <ul [ngSwitch]="status">
    <li *ngSwitchCase="1">已支付</li>
    <li *ngSwitchCase="2">订单已经确认</li> 
    <li *ngSwitchCase="3">已发货</li>
    <li *ngSwitchDefault>无效</li>
  </ul>
```

#### 	3.3.5 事件绑定

​		 Angular 的事件绑定语法由等号左侧括号内的目标事件名和右侧引号内的模板语句组成。目标事件名是 `click` ，模板语句是 `onSave()` 

事件对象通过`$event`传递

```jsx
export class AppComponent {
   onSave(){
       console.log('点击了按钮')
   }
}

<button 2(click)="onSave($event)">Save</button>
```

#### 	3.3.6 双向绑定

双向绑定是应用中的组件共享数据的一种方式。使用双向绑定绑定来侦听事件并在父组件和子组件之间同步更新值

ngModel指令**只对表单元素有效**，所以在使用之前需要导入`FormsModule`板块

```jsx
import { FormsModule } from '@angular/forms';

@NgModule({
  // 申明组件内用到的视图
  declarations: [
    AppComponent,
    HelloComponent,
  ],
  //引入模块需要的类
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  //全局服务
  providers: [],
  //根组件
  bootstrap: [AppComponent]
})
```

```jsx
export class AppComponent {
  userName='';
}
<div>
    输入: <input [(ngModel)]="userName">
	<h1>你输入了: {{userName}}</h1>
</div>
```

#### 	3.3.7 模板引用变量

模板变量可以帮助你在模板的另一部分使用这个部分的数据。使用模板变量，你可以执行某些任务，比如响应用户输入或微调应用的表单

在模板中，要使用井号 `#` 来声明一个模板变量。下列模板变量 `#userName` 语法在 `<input>` 元素上声明了一个名为 `userName` 的变量

```html
<input #userName placeholder="请输入用户名" />
```

可以在组件模板中的任何地方引用某个模板变量

```jsx
<button (click)="callUserName(userName.value)">Call</button>


export class AppComponent {
   callUserName(v){
       console.log(v)
   }
}
```

Angular 根据你所声明的变量的位置给模板变量赋值：

- 如果在组件上声明变量，该变量就会引用该组件实例。
- 如果在标准的 HTML 标记上声明变量，该变量就会引用该元素。
- 如果你在 `<ng-template>` 元素上声明变量，该变量就会引用一个 `TemplateRef` 实例来代表此模板。

#### 3.3.8 表单控件

使用表单控件有三个步骤。

1. 在你的应用中注册响应式表单模块。该模块声明了一些你要用在响应式表单中的指令。
2. 生成一个新的 `FormControl` 实例，并把它保存在组件中。
3. 在模板中注册这个 `FormControl`。

**注册响应式表单模块**

要使用响应式表单控件，就要从 `@angular/forms` 包中导入 `ReactiveFormsModule`，并把它添加到你的 NgModule 的 `imports` 数组中。

```js
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```

要注册一个表单控件，就要导入 `FormControl` 类并创建一个 `FormControl` 的新实例，将其保存为类的属性。

```js
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
}

//使用这种模板绑定语法，把该表单控件注册给了模板中名为 name 的输入元素。这样，表单控件和 DOM 元素就可以互相通讯了：视图会反映模型的变化，模型也会反映视图中的变化

<label>
  Name:
  <input type="text" [formControl]="name">
</label>
<p>
  Value: {{ name.value }}
</p>
```

修改name值可以通过`FormControl` 提供的 `setValue()` 方法

```js
updateName() {
  this.name.setValue('Tina');
}
```

#### 3.3.9 表单控件分组

表单中通常会包含几个相互关联的控件。响应式表单提供了两种把多个相关控件分组到同一个输入表单中的方法

要将表单组添加到此组件中，请执行以下步骤。

1. 创建一个 `FormGroup` 实例。
2. 把这个 `FormGroup` 模型关联到视图。
3. 保存表单数据。

**创建一个 FormGroup 实例**

在组件类中创建一个名叫 `loginForm` 的属性，并设置为 `FormGroup` 的一个新实例。要初始化这个 `FormGroup`，请为构造函数提供一个由控件组成的对象，对象中的每个名字都要和表单控件的名字一一对应

```js
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
}

//模板渲染
<form [formGroup]="loginForm">
  
  <label>
    账号:
    <input type="text" formControlName="userName">
  </label>

  <label>
    密码:
    <input type="text" formControlName="password">
  </label>

</form>
```



#### 	3.3.10 表单验证 

​	表单元素添加`required`关键字表示必填，通过绑定`ngModel`的引用可以拿到到当前组件的信息，通过引用获取到验证的信息

```jsx
export class AppComponent {
    fromData={
       name:'',
       password:''
    };

    subBtnFUn(obj){
      console.log(obj)
    }
}

<form  action="">
    账号：<input required #nameInp="ngModel" type="text" [(ngModel)]="fromData.name" name="userName">
    <br>
    <span>{{nameInp.valid }}</span>
    <hr>
    密码：<input required  #pasInp="ngModel" type="text" [(ngModel)]="fromData.password" name="password">
    <br>
    <span>{{pasInp.valid }}</span>
    <hr>
    <button (click)="subBtnFUn(nameInp)">提交</button>
</form>
```

我们还可以通过 **ngModel** 跟踪修改状态与有效性验证，它使用了三个 CSS 类来更新控件，以便反映当前状态。

| 状态             | 为 true 时的类 | 为 false 时的类 |
| :--------------- | :------------- | :-------------- |
| 控件已经被访问过 | `ng-touched`   | `ng-untouched`  |
| 控件值已经变化   | `ng-dirty`     | `ng-pristine`   |
| 控件值是有效的   | `ng-valid`     | `ng-invalid`    |

#### 	3.3.11 自定义表单验证

​	先引入表单的一些内置依赖

```js
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

//构造函数里注入FormBuilder
constructor(private fb:FormBuilder) { }

//错误提醒数据
formErrors = {
  'title': '',
  'content': ''
};


//在组件类的初始化函数里对表单中的元素的校验进行定义，并调用表单的valueChanges方法，检测表单的输入的变化
ngOnInit():void {
  this.taskInfo.isComplete = 1;
  this.tasksForm = this.fb.group({
     userName: ['', [Validators.required,
    				 Validators.maxLength(18),
                     Validators.minLength(6) ] ],
    password: ['', [this.passWordVal]],
    phone: ['', [Validators.required,this.phoneVal],]
  });

  phoneVal(phone: FormControl): object {
    const value = phone.value || '';
    if(!value) return  {desc:'请输入手机号'}
    const valid =  /[0-9]{11}/.test(value);
    return valid ? {} :{desc:'联系电话必须是11位数字'}
  }
  passWordVal(password:FormControl):object{
    const value = password.value || '';
    const valid = value.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/);
    return valid ? {} : {passwordValidator: {desc:'密码至少包含 数字和英文，长度6-20'}}
  }
}
```

#### 3.3.12 管道

​	管道的作用就是传输。不同的管道具有不同的作用。(其实就是处理数据)

`angular`中自带的`pipe`函数

| 管道          | 功能                                                         |
| ------------- | ------------------------------------------------------------ |
| DatePipe      | 日期管道，格式化日期                                         |
| JsonPipe      | 将输入数据对象经过JSON.stringify()方法转换后输出对象的字符串 |
| UpperCasePipe | 将文本所有小写字母转换成大写字母                             |
| LowerCasePipe | 将文本所有大写字母转换成小写字母                             |
| DecimalPipe   | 将数值按照特定的格式显示文本                                 |
| CurrentcyPipe | 将数值进行货币格式化处理                                     |
| SlicePipe     | 将数组或者字符串裁剪成新子集                                 |
| PercentPipe   | 将数值转百分比格式                                           |

`pipe`用法

- {{ 输入数据 | 管道 : 管道参数}} (其中‘|’是管道操作符)

- 链式管道 {{ 输入数据 | date | uppercase}}

- 管道流通方向自左向右，逐层执行

    使用脚手架命令：**ng g p test**

    ```js
    import { Pipe, PipeTransform } from '@angular/core';
    
    @Pipe({
      name: 'testTitle'
    })
    export class TestPipe implements PipeTransform {
    
      transform(value: unknown, ...args: unknown[]): unknown {
        console.log(value)
        return 'title';
      }
    }
    
    
    <p>{{ 'Angular' | testTitle }}</p>
    
    ```

    

### 	3.4 服务

   angular中，把从组件内抽离出来的代码叫服务，服务的本质就是函数

 官方认为组件不应该直接获取或保存数据， 它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务。而服务就充当着数据访问，逻辑处理的功能。把组件和服务区分开，以提高模块性和复用性。通过把组件中和视图有关的功能与其他类型的处理分离开，可以让组件类更加精简、高效。

使用命令ng g s xxx创建一个服务，通过**@Injectable()**装饰器标识服务。

```js
//导入Injectable装饰器
import { Injectable } from '@angular/core';
//使用Injectable装饰器声明服务
@Injectable({
  //作用域设定，'root'表示默认注入，注入到AppModule里
  providedIn: 'root',
})
export class TestService {
}

```

组件中如何使用服务呢，必须将服务依赖注入系统、组件或者模块，才能够使用服务。我们可以用**注册提供商**和**根注入器**实现**。**

   该服务本身是 CLI 创建的一个类，并且加上了 `@Injectable()` 装饰器。默认情况下，该装饰器是用 `providedIn` 属性进行配置的，它会为该服务创建一个提供商。



### 3.5 依赖注入

​	在这个例子中，`providedIn: 'root'` 指定 Angular 应该在根注入器中提供该服务,从而实现**根注入器**将服务注入，它就在整个应用程序中可用了**。**

**providedIn**：

​	'root' ：注入到AppModule，提供该服务，所有子组件都可以使用（推荐）

​	null ： 不设定服务作用域（不推荐）

​	组件名：只作用于该组件（懒加载模式）

```js

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
}


import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    console.log(this.heroService.getHeroList())
  }
}
```

​	也可以使用 `@Component` 或 `@Directive` 内部的 `providers: []`，为特定的组件子树提供服务，这也将导致创建多个服务实例(每个组件使用一个服务实例)

```js

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
}


import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [HeroService]
})
export class TestComponent implements OnInit {

  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    console.log(this.heroService.getHeroList())
  }
}
```



### 3.6 路由

​	路由就是连接组件的筋络,它也是树形结构的.有了它,就可以在angular中实现路径的导航模式

可以把路由看成是一组规则,它决定了url的变化对应着哪一种状态,具体表现就是不同视图的切换

在angular中,路由是非常重要的组成部分, 组件的实例化与销毁,模块的加载,组件的某些生命周期钩子的发起,都是与它有关

#### 3.6.1 路由基本使用

**路由器**是一个调度中心,它是一套规则的列表,能够查询当前URL对应的规则,并呈现出相应的视图.

**路由**是列表里面的一个规则,即路由定义,它有很多功能字段:

- **path**字段,表示该路由中的URL路径部分
- **Component**字段,表示与该路由相关联的组件

每个带路由的Angular应用都有一个路由器服务的单例对象,通过路由定义的列表进行配置后使用。

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'

const routes: Routes = [
 {path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

```jsx
//路由导航 
<a [routerLink]="['/home']">home</a>
 <a [routerLink]="['/hello']">hello</a>

//组件渲染输出
<router-outlet></router-outlet>
```

上述具体的工作流程,可以举例简单描述为：

- 当浏览器地址栏的URL变化时，路径部分`/home`满足了列表中path为"**home**"的这个路由定义,激活对应**HomeComponent**的实例,显示它的视图
- 当应用程序请求导航到路径`/hello`时,符合了另外的规则,激活对应视图且展示内容,并将该路径更新到浏览器地址栏和历史

####   3.6.2 路由嵌套

​		父子路由嵌套配置：

```js
const routes: Routes = [
    {path:'home',
      component:HomeComponent,
      children:[
        {path:'hello',component:HelloComponent}
      ]
    },
];
```

​	在**home Component**内这是`router-outlet`路由出口，即可在**home** 路由内渲染子级路由

```jsx
//home template
<h2>home Component</h2>
<a [routerLink]="['/home/hello']">hello</a>
<router-outlet></router-outlet>
```

​	在非`home Component`内跳转到`/home/hello`路由需要写全路径

```jsx
//app template
<h2>app Component</h2>
<a [routerLink]="['/home/hello']">hello</a>
<router-outlet></router-outlet>
```

​		

####    3.6.3 路由传参

- **query**

     在a标签上添加一个参数queryParams，并通过`this.routerinfo.snapshot.queryParams`获取参数

    ```jsx
    <a [routerLink]="['/hello']" [queryParams]="{id:3}" >hello</a>
    ```

    ```js
    import {ActivatedRoute} from '@angular/router';
    constructor(private routerinfo:ActivatedRoute) { }
    
     ngOnInit() {
      //id为参数名字
        this.id=this.routerinfo.snapshot.queryParams["id"]
      }
    ```

    

- **params**

    修改路由配置文件`path`,路由导航`a`标签`routerLink`后面数组的第二个参数为传递的值

    并且通过`subscribe`请阅的方式获取`name`参数

    ```js
     {
        path: 'hello/:name',
        component:HelloComponent,
      },
    ```

    ```jsx
    //我们在后面添加/:name此时name即为传递的参数名字
    //a标签设置如下
    <a [routerLink]="['/hello','我是url传递参数']" [queryParams]="{id:3}" >hello</a>
    ```

    ```js
    ngOnInit() {
        this.routerinfo.params.subscribe((params:Params)=>{
          this.name=params['name']
        })
      }
    ```

