---
layout: post
title: "HOWTO: Change Roomba Into Raceba"
date: 2005-07-13 -0800
comments: true
disqus_identifier: 858
tags: [personal]
---
I was joking a while ago talking about
[Nuttba](/archive/2005/05/26/nuttba.aspx) - a hypothetical modified
version of Roomba that could automatically drive around and smack you in
the happy sack. It did, however, give me an idea.

 See, I had an issue with my Roomba where [some wheel sensor or another
got blocked](/archive/2005/06/21/karmic-blowback.aspx). Roomba support
sent me a whole new one, but the old one was unusable. Time to play with
the Roomba remains.

 I decided that if it wasn't going to vacuum any more, it needed to be
speedy. Maybe I could take it one step closer to Nuttba? "Raceba" maybe
- race it around the place?

 The endgame: make Roomba a remote controlled beast.

 I know Roomba [already has a remote
control](http://www.irobotstore.com/CGI-BIN/LANSAWEB?WEBEVENT+L095C4D814AB2403C737E683+JGW+ENG),
but Roomba's not meant for speed. There are three possible schools of
thought here:
 **Hardware Engineer**: Buy some parts to replace/rewire the engines,
remove the unnecessary extras, and bolt the whole thing back together
better than before.
 **Software Engineer**: Buy something that can replace the whole inner
workings off-the-shelf with minimal effort because I don't do that
'hardware thing.'
 **Everyone Else**: What's the point?

 I'm a software engineer, so my solution is not nearly as elegant as it
could be if I knew more hardware stuff, but it only cost me $14 and
took a couple of hours, tops.

 **[Warning - this is a 100% destructive process. Your Roomba will NEVER
vacuum again. This unit was dead, so it was fine. But if you do this,
it's at your own risk and cost. Just be warned.]**

 Here it is: How to make Roomba more fun - pictures and step-by-step
description of the process. Enjoy.
 Okay, so here's the standard Roomba that we know and love.

 ![Roomba - the
beginning](https://hyqi8g.blu.livefilestore.com/y2pCE8I_zBx_GTc211ctoylepDsi-QbHj20w2yyRLe5BI3CV4XR_xiL6qxRZMXgcOr6CeRVLv2fr6XRTcEy6n6DwTbHbaO41szAADtundRSLg0/20050713nuttba001ql9.jpg?psid=1)

 Flip him over. There are a bunch of screw holes that hold the bumper
and body on. Look around and find them. Note there are a couple down by
the black vacuum motor unit in the center of Roomba - theyr're a little
hard to get to, but you should see them.

 ![Inspecting the underside of
Roomba](https://hyqi8g.blu.livefilestore.com/y2pDRbB9tABqeQ-4SLyuuX04glSozSKnaMU1DJfHnbD4YTS2OIDZvLz7Orm4lGPfTtkK0t1j4I2ISROTa5lnT-qQKGW1lfIaeQO175mcJvc_-g/20050713nuttba002xk7.jpg?psid=1)

 Detach the bumper first to make it easier - the bumper partially holds
the main body top on. You'll need a skinny screwdriver to get into the
screws in the bumper, like I have here.

 ![Removing the
bumper](https://hyqi8g.blu.livefilestore.com/y2pubDnHRaM8ZG1FECW1m00GtLf4FljD4T12YTSZHXACq5pTQFfY243mJWJMy6R88THC9qADwere_JOaNsV2NUzp8cGS9gS-KuZf6EkYdt6jsU/20050713nuttba003wt5.jpg?psid=1)

 The bumper is connected to the main body with some wires. Not that we
need to be all that careful (we're going to gut Roomba anyway), but
disconnecting the wires makes for easier bumper removal.

 ![Disconnect the bumper
wires](https://hyqi8g.blu.livefilestore.com/y2p_1gzx8jIPeuUcH835uTboKOC92DjEyi6A9fyBwvu2sfTPayu1rxtzvUi_QMZSEaLPw1EQZ5yhm0g0mKhE6Qxusm8xFTDVZ-OVMmdD4MiAxk/20050713nuttba004po2.jpg?psid=1)

 Now you should be able to remove the top (assuming you've removed the
rest of the screws holding it on. The top is also connected with a bunch
of wires. Just go ahead and cut those.

 ![Wires connect the top to the
body](https://hyqi8g.blu.livefilestore.com/y2psQPu5KR3qCPrDOMm2Rp-9cIEmUWyrazg1CKgsw-6CaIE5qn_rL6WCI-TLFXOGyY6qtGan0MorcisbLN27KH-MPqb25jlY337VJLp0Qm1HyM/20050713nuttba005fp3.jpg?psid=1)

 In the back where the dust bin plugs in, the little connectors that
hold the dust bin in place also hold down some wires. You can pull them
up to release the wires.

 ![Pulling out the dust bin
holders](https://hyqi8g.blu.livefilestore.com/y2pOXEIvN1lBoznstMmgwNpZsw39A_adaju7G52xDc_QjJW-yy98ebmLN7anfayKajeSZmqwwHjGeTqwvhUQzxGspjj0fOcSfZD5TwTHeJlLHo/20050713nuttba006qx9.jpg?psid=1)

 The main board in Roomba has a bunch of wires connected to it, too.
Disconnect as many as you can. We'll cut the rest later.

 ![Disconnect wires from the main
board](https://hyqi8g.blu.livefilestore.com/y2pHNMjVlC-0Cr-1SJC8MhMI_xClh082MhCoJ107W7chgSRlefdkbVKROcRQmrc9HvouDmClR74Gdi3TBuLS0F4LvYa9wGErsg_7QO43XURa4U/20050713nuttba007ek4.jpg?psid=1)

 Get that vacuum motor out of the way. We don't need that anymore.

 ![Clip the vacuum motor
wires](https://hyqi8g.blu.livefilestore.com/y2paRgcl7OWBlXa5eQGo991k2pxGnkRHLUD7-9FZyB_BuHfwvdbQAjRKBOXwlVUKtRBOyoY9JvM_u7GQ-LmT_c-JE_-C8vP8kacXPQ48v9tXz0/20050713nuttba008ww6.jpg?psid=1)

 Okay, now, again, back where the dust bin connectors are, you'll see
that one side has some wires screwed to it. Unscrew the wire connections
to release the wires, but put the little metal clips back - they stop
the dust bin from rattling around too much.

 ![The metal dust bin
clips](https://hyqi8g.blu.livefilestore.com/y2pQw7eTAkc4B1DDxCN9ujsTqkPvoaQiestC0RgPxV7Bmgx0FL2prIpHk9nv65qnWA4dIlJFXv1lOdTlzg8XncdCHrekEgDdB4rok9UTdPQauQ/20050713nuttba009kz2.jpg?psid=1)

 Strip the wires and stuff from the inside of Roomba. When you've got
the wires stripped, he'll look like this:

 ![Roomba with the wires stripped
out](https://hyqi8g.blu.livefilestore.com/y2pYZFJ-UG-7-p7QGK9JN7uelrBcWrskcEy55e75kVMHfVku8U5R-8sypHVvotOCHctJCYnRtNOl-4D6C85bmOEI977UglBw9uR2pjIgzdMggo/20050713nuttba010jg8.jpg?psid=1)

 We don't need the wheels anymore. Disconnect the springs that hold the
wheels down, then unscrew the screws that hold the wheels on. Don't lose
the little screws or the plastic bits on the underside that hold the
screws in, though - you need those.

 ![Disconnect and remove the
wheels](https://hyqi8g.blu.livefilestore.com/y2pOqAS40pg1qqe5iu2e8M6S1uMMAvafKMKnjJNxIL9LxWvoHkPe6lyDdwvcDi6zVLHlrJ1MvulMe1JwfuNfFWIeyKzu_WZFziRIWTGeWmHqbM/20050713nuttba011xw8.jpg?psid=1)

 The screw on the outside of each wheel that held the wheel in needs to
be replaced. Those screws also hold the sides of Roomba together. Here's
the top view of where the right wheel used to be - you can see that the
inside screw isn't there, but the outside one is.

 ![Replace the outside screws from each
wheel](https://hyqi8g.blu.livefilestore.com/y2p5bxonl9brFNlZZtuoY8D9L2ny0YnbGEKBBGmAcrJKD06IpdEMDJU5hn88DJgCmz9A439ZnNK5j614WAie7K83aB0eDQFc2IkSc5YURgEcEs/20050713nuttba012ms5.jpg?psid=1)

 This is the underside view of that screw - see how the little black
plastic bit is what holds the screw in? That's why you can't lose those
when you remove the wheels.

 ![Underneath the wheel
bay](https://hyqi8g.blu.livefilestore.com/y2pDCk0wYz8HCM3d298BvnxGyRzN3UrdbvYh1-acTS9ZFNGrzjIFiG2ZYcCfVcJxCCzAZCpKXg2IuAPp07ab5mDXE3uImRN-wQi-yDk_fZ7-vQ/20050713nuttba013re5.jpg?psid=1)

 Here's the trickiest part of the thing. You'll see on each side of the
main board that there are black plastic "boxes" that hold the bumper
spring arms in. If you unhook the spring arms, you'll see they just fly
out and would never hold the bumper on.

 ![The bumper arm movement restriction
boxes](https://hyqi8g.blu.livefilestore.com/y2p6GGZoAn1wWBbe_5jKQarAKIduYhMHjbGGjCxnibGOBtBjJGkXUtID8gfLA9TLvHYrrjd30KeG9MfhEKNyvKiG2QWuBuFfCWa-oC3i5hqHyw/20050713nuttba014re3.jpg?psid=1)

 Disconnect the bumper spring arms from the main board, then remove the
main board from the Roomba by unscrewing the little retaining brackets
on either side. Use a Dremel tool to cut the two ends off the main board
- just enough to leave the black plastic boxes on each side. You don't
need the middle of the board, just those ends. Hot glue the two ends
back into their original positions and replace the retaining brackets.
It doesn't have to be indestructible, just enough to hold the bumper
arms in.

 ![The trimmed down main
board](https://hyqi8g.blu.livefilestore.com/y2pmCcnurvXPBXwNvCtcyChvYuTeETrYt_yy76ahZyQCcmCWhhkm3aRztx8wVb79Jww0PQt58n1ZVyHV7f0aQ1sxnnrauqi80tG3L3z7LaDw54/20050713nuttba015vz1.jpg?psid=1)

 As you've seen, we've removed as much extraneous weight from Roomba as
possible. One last thing - on the dust bin, there's a blue rubber
"apron" thing. Pull that off. You don't need it dragging around. You can
later sand down the tabs on the dust bin that held the rubber apron on.

 ![Remove the dust bin
apron](https://hyqi8g.blu.livefilestore.com/y2pl1iRpyat7uLopj2ouEJzPHOc8jS0ViLsE_s5PhKurUGMdESjX7-DTmztimX6xMA2iNWnPE2QDy-dmIVnfaI-QRS6Ac6ADez1tiBBVVLI5R4/20050713nuttba016oj3.jpg?psid=1)

 Now, the R/C car I bought was the $14 6V el cheapo from the toy store.
Roomba's only about 12" in diameter, so you can't have anything much
bigger than this or it'll stick out from underneath. This one was just
about right, maybe a little on the small side. But the price was right,
and I can always go back and use a better one. It's going to be
sacrificed anyway, so $14 was pretty reasonable.

 ![The Tyco R/C car, ready for
use](https://hyqi8g.blu.livefilestore.com/y2pnmJU7tBmmvEkTsOso6TnGUnFQkM9luhZZ1iCF_XV-pr3CQJP9nbxCkxbkuzykyKlmVTDepOTd25IRZaDuIwz5hFIXVFhLWUdc2s7vuOiPOQ/20050713nuttba017qa7.jpg?psid=1)

 Unpack the car and remove the plastic body because you won't need it.
Be careful when you remove it that you don't accidentally rip off the
antenna wire they have attached to the underside of the body.

 ![Be careful of the
antenna](https://hyqi8g.blu.livefilestore.com/y2pZRfCZ1CXMT-Z1ACkSqyirSHJ8FMxx0fzwzVLJ0MCeUIAAIC6TerK6zICg_Uu0d7U861cwik3wajzswnSiFbY-laOpxxlzJ0AHbnT7cBssJk/20050713nuttba018mr3.jpg?psid=1)

 The stripped R/C car, ready to go Roomba:

 ![The stripped down R/C
car.](https://hyqi8g.blu.livefilestore.com/y2pXBz1PaGYeZ3vytP8cHTQICHTb92_PuPDP-M5Kc-TIYDEDVCOBOXbezShLKcHwkVXSRnUUShebpHJEGH_A_3H1Ph4XDW-RlxjQ6MWEi7osWg/20050713nuttba019zb8.jpg?psid=1)

 At this point, you can re-attach Roomba's top, then the bumper (in that
order). Finally, the dust bin.

 Here's the other tricky part - you have to cut out notches in the
Roomba body so the R/C car can mount to it. We'll mount it with some
screws using the same holes that held the original R/C car body on, but
we'll screw through Roomba's underside.

 I ended up holding the car up to the bottom of Roomba and tracing out
some lines, then using a Dremel tool to cut out the parts to help it lay
flat. You'll see I cut out a section near the battery compartment and a
small bit from the dust bin. The battery compartment turned out to be
perfectly located for the wheels on the car, so I didn't have to cut out
anything to make sure the wheels would move correctly.

 Mount the R/C car to Roomba using some screws. The screws I used were
some 1.5" wood screws, but it doesn't really matter as long as they fit
in the holes in the R/C car. You're going to be drilling some holes (or
forcing the screws through) in Roomba anyway.

 ![The R/C car mounted to
Roomba](https://hyqi8g.blu.livefilestore.com/y2ppjnBLyVce1akn7mP3eIG0B0uoX0az1yKu-wEuCYbzP1lekcjsQytRgRPBxv_8OKVI1wpkVKoa0-EZMVamfkX4G794BBuLxPz4hdQu_q-860/20050713nuttba021xp3.jpg?psid=1)

 Here's a different view of the mounted R/C car:

 ![The car mounted to the bottom of the Roomba
body.](https://hyqi8g.blu.livefilestore.com/y2pXVmNB6_Bk-_-0bNOatviVbs-XAwuR8lBXLcnylhWivr0n4S6PB4zcufRu1UUabunC8lOVdbZM3j7lnuWaS3WU06a2jSMAP0Ua6gZqTS8ojY/20050713nuttba022qt3.jpg?psid=1)

 Raceba lives! You'll see it doesn't sit too much higher than original
Roomba - maybe another inch.

 ![Raceba - ready to
go!](https://hyqi8g.blu.livefilestore.com/y2pV1xWs7dXtQGb3pJrtB_Clws1fImkETFLpHgzhDH7gr43hSMXtnL2PYlU782JDjxdDpfiihwFQ9lnROW7uKJU8ueABdc0jK6mxP0Ybo8QrOs/20050713nuttba023ef9.jpg?psid=1)

 I took this thing to work and we had a blast with it. I think I'm going
to put one of those orange kid bike flags on it so I can see where it is
over the cube walls.

