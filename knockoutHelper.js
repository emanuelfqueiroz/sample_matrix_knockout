
function ko_convert(target)
{
    ko.utils.objectForEach(target, function (name, value) {
        if (!ko.isComputed(value) && !ko.isPureComputed(value)) {
            target[name] = ko.observable(value);
        }
    });
    return target;
}