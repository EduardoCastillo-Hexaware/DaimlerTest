using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APIDaimler.Models
{
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string? Rolev { get; set; }
        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
