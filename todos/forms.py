from django import forms
from .models import Todo


class TodoForm(forms.ModelForm):

    #   constructor
    def __init__(self,user,*args,**kwargs):
        #   assign passed in user locally
        self.user = user
        super(TodoForm,self).__init__(*args,**kwargs)


    #   what happens when the form is saved
    def save(self,commit=True):
        #   prevent the form from saving immediately
        #   need to first assign the user to the object
        #   before saving to the DB
        instance = super(TodoForm,self).save(commit=False)

        #   auto set the user instance to that provided by the view
        instance.user = self.user

        if commit:
            instance.save()
        return instance

    #   Define which model elements to display in the form
    class Meta:
        model = Todo
        fields = ('title',
                  'description',
                  'status',)
