# Harvey
A server managment utility.

---

## Reqs

Role based channel selection.
- ADMIN COMMANDS
    - ;harv role create
        - Creates a join-able role which will act as a notification subset and will reveal hidden channels
    - ;harv role [role] link [channel]
        - Links a given channel to the given role making the channle visable to the members of a given role
    - ;harv role [role] open [true|false]
        - Sets whether a role is open to join/leave (roles are closed by default to prevent premature joins)
    - ;harv role setjoinchannel [channel]
        - Sets the channel which will be used to display all the available roles
- COMMANDS
    - ;role join [name]
        - Adds the sender to a harvey role if open or if the sender is an admin.
    - ;role leave [name]
        - Removes the sender from a role if open or admin.
- FEATURES
    - Click emoji to join/leave role.