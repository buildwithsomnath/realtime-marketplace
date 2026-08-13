# conversation/models.py

from django.db import models
from django.contrib.auth.models import User

from item.models import Item


class Conversation(models.Model):
    item = models.ForeignKey(
        Item,
        related_name="conversations",
        on_delete=models.CASCADE,
    )

    participants = models.ManyToManyField(
        User,
        related_name="conversations",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"Conversation #{self.id}"


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        related_name="messages",
        on_delete=models.CASCADE,
    )

    sender = models.ForeignKey(
        User,
        related_name="messages",
        on_delete=models.CASCADE,
    )

    content = models.TextField()

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.content[:40]


class MessageReaction(models.Model):
    message = models.ForeignKey(
        Message,
        related_name="reactions",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        User,
        related_name="message_reactions",
        on_delete=models.CASCADE,
    )
    emoji = models.CharField(max_length=16)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("message", "user", "emoji")
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.user.username} reacted {self.emoji} to message #{self.message.id}"