---
layout: post
title: "PlantUML Diagrams in Azure DevOps Wiki Pages"
date: 2020-05-11 -0800
comments: true
tags: [azure,git]
description: "PlantUML isn't currently supported in Azure DevOps wiki pages and Mermaid.js support is slow to update. Here's one way you can get PlantUML diagrams into your Azure DevOps wiki pages."
image: /images/20200511_simplediagram.png
---

I use Azure DevOps wikis a lot and I love me some [PlantUML](https://plantuml.com/) diagrams - they're far easier to maintain than dragging lines and boxes around.

Unfortunately, Azure DevOps wiki doesn't support PlantUML. There's [Mermaid.js support](https://docs.microsoft.com/en-us/azure/devops/project/wiki/wiki-markdown-guidance?view=azure-devops#add-mermaid-diagrams-to-a-wiki-page) but it's a pretty old version that doesn't support newer diagram types so it's very limited. [They're being very slow to update to the latest Mermaid.js version, too](https://developercommunity.visualstudio.com/idea/883356/mermaid-support-for-class-diagrams-and-state-diagr.html), so it kind of leaves you stuck. Finally, it doesn't seem like [there's any traction on getting PlantUML into Azure DevOps](https://developercommunity.visualstudio.com/idea/747577/add-support-for-plantuml.html), so... we have to bridge that gap.

**I bridged it by creating an automatic image generation script for PlantUML files.** If you're super anxious, [here's the code](https://github.com/tillig/plantuml-in-azdo-wiki) Otherwise, let explain how it works.

First, I made sure my wiki was [published from a Git repository](https://docs.microsoft.com/en-us/azure/devops/project/wiki/publish-repo-to-wiki?view=azure-devops&tabs=browser). I need to be able to access the files.

I used a combination of [`node-plantuml`](https://www.npmjs.com/package/node-plantuml) for generating PNG files from PlantUML diagrams along with [`watch`](https://www.npmjs.com/package/watch) to notify me of filesystem changes.

Once that script is running, I can create a `.puml` file with my diagram. Let's call it `Simple-Diagram.puml`:

```text
@startuml
Bob->Alice : hello
@enduml
```

When I save that file, the script will see the new `.puml` file and kick off the image generator. It will generate a `.png` file with the same name as the `.puml` (so `Simple-Diagram.png` in this case). As the `.puml` file changes the generated image will update. If you delete the `.puml` file, the image will also be removed.

![Simple diagram example from PlantUML]({{ site.url }}/images/20200511_simplediagram.png)

Now in your wiki page, you just include the image.

```markdown
![PlantUML Diagram](Simple-Diagram.png)
```

The drawback to this approach is that you have to render these on your editing client - it's not something that happens via a build. I didn't want a build generating something and committing that to the repo so I don't mind that too much; you can look at integrating it into a build if you like.

The benefit is that it doesn't require a PlantUML server, it doesn't require you run things in a container to get it working... it just works. Now, I think under the covers the `node-plantuml` module is running a PlantUML `.jar` file to do the rendering, but I'm fine with that.

The editing experience is pretty decent. Using a Markdown preview extension, you can see the diagram update in real-time.

![VS Code and PlantUML]({{ site.url }}/images/20200511_vscode.png)

**[I have an example repo here with everything wired up!](https://github.com/tillig/plantuml-in-azdo-wiki)** It has the watcher script, VS Code integration, the whole thing. You could just take that and add it to any existing repo with an Azure DevOps wiki and you're off to the races.
