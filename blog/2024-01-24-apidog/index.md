---
slug: apidog
title: Apidog - Better than POSTMAN
authors: [namnguyen]
tags: [apidog.com]
---

Apidog is a new tool that i discoverd today.

My main purpose was get a tool that can help me generate request from swagger/api-json **(the api schema)** and then use the request in my api testing scenario.

Then i found _Apidog_.

The first thing i want to do is import all existed api from swagger to the project and this actually could be done pretty easier using apidog

### Import _API_ from swagger/api-json

- After you install _Apidog_ app > open it
- Then on the left hand side, click at APIs, you should see something like this.

![Apidog First View](/img/20240124/api-first-view.png)

- Click on the _purple plus button_ and choose _import_

![Import Swagger API](/img/20240124/import-swagger-api.png)

- Click Submit then you'll see a list of your existed api

![API List](/img/20240124/api-list.png)

- Then _Confirm_

### API List and Data Transfer Object Schema (DTOs)

After confirm i not only have the api list i also have the dto schema

![API List generated with DTO schema](/img/20240124/api-list-generated-with-dto-schema.png)

I can also generate the typescript code from that schema dtos. AWESOMEEEEEEE!!!

![Generated DTOs Typescript](/img/20240124/generated-dto-typescript.png)

### Testing my imported API

Now let's do some simple test case and get the test report.

- Click _Testing_ on the left hand side sidebar you should and click at the **purple plus button** and choose **New Test Scenario**

![Create New Test Scenario](/img/20240124/create-new-test-scenario.png)

- What i'm gonna do is create a Health Check Test and you should see something like this

![After Create New Test Scenario](/img/20240124/after-create-new-test-scenario.png)

- Then choose add step click at import from APIs and choose the Health Check API
- Then i'm gonna choose **Post Processors** and select **Response Body String Check** on the right handside Template List

You Can see The script here

```js
pm.test("Testing response", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.message).to.eql("OK");
});
```

Test succeed case.

![Check succeed](/img/20240124/assertion-succeed.png)

Test fail case.

![Check failed](/img/20240124/assertion-failed.png)

The Final Report.
![Final Report](/img/20240124/final-report.png)

Readmore on [Apidog](https://apidog.com/help/introduction/walk-through-apidog/)
