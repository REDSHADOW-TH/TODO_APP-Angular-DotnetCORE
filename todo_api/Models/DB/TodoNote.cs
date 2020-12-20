using System;
using System.Collections.Generic;

#nullable disable

namespace todo_api.Models.DB
{
    public partial class TodoNote
    {
        public int Id { get; set; }
        public int? Seq { get; set; }
        public string Title { get; set; }
        public string TextMessage { get; set; }
        public string CreateBy { get; set; }
        public int Active { get; set; }
    }
}
