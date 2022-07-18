---
title: Troubleshooting
info: Prueba.
sidebar: troubleshooting
---


<section id='contenido'>
{% for post in site.posts %}
  <article class='{{ post.type }}'>
    <a name='{{ post.url }}' href='#{{ post.url }}'><h2>{% if post.type %}<code><b>{{ post.type }}</b> {{ post.url_path }}</code> {% endif %}{{ post.title }}</h2></a>
    <section class='body'>
      {{ post.content }}
    </section>
  </article>
{% endfor %}
</section>
