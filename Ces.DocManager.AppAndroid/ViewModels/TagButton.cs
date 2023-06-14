namespace Ces.DocManager.AppAndroid.ViewModels
{
    public class TagButton : ImageButton
    {
        public static readonly BindableProperty IsCheckedProperty =
        BindableProperty.Create(nameof(IsChecked), // название обычного свойства
            typeof(Boolean), // возвращаемый тип 
        typeof(TagButton), // тип,  котором объявляется свойство
            false// значение по умолчанию
        );
        public Boolean IsChecked
        {
            set
            {
                SetValue(IsCheckedProperty, value);
            }
            get
            {
                return (bool)GetValue(IsCheckedProperty);
            }
        }
    }
}
